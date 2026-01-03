
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image, ImageOps
import io
import os
import sys
print("🔍 Uruchamianie serwera.. .", file=sys.stderr, flush=True)

# Dodaj ścieżkę do głównego katalogu projektu
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from Camera. camera import Camera
from Segmentation.segmentation import Segmentation
from ChangeBackground.changeBackground import ChangeBackground
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Pozwala na requesty z React (localhost:3000)

# ========== KONFIGURACJA ==========
MODEL_PATH = "../Model/yolo11n-seg.pt"
BACKGROUNDS_DIR = "../Backgrounds"
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ========== GLOBALNE ZMIENNE ==========
model = None
camera = None
current_mode = "blur"  # blur, color, image, original
current_color = "#00FF00"  # Domyślny kolor (zielony)
current_bg_image = None


# ========== INICJALIZACJA ==========
def initialize():
    global model, camera
    
    print("🔄 Ładowanie modelu YOLO...")
    model = YOLO(MODEL_PATH)
    print("✅ Model załadowany!")
    
    print("📷 Inicjalizacja kamery...")
    camera = Camera()
    print("✅ Kamera gotowa!")


# ========== GENERATOR RAMEK WIDEO ==========
def generate_frames():
    global camera, model, current_mode, current_color, current_bg_image
    
    TARGET_WIDTH = 640
    
    print("\n🎥 ========== STREAM STARTED ==========")
    print(f"Mode: {current_mode}")
    print(f"Color: {current_color}")
    print("=" * 50 + "\n")
    
    frame_count = 0
    
    while True:
        try: 
            frame_count += 1
            
            if frame_count % 30 == 0:  # Log co 30 ramek (co ~1 sekundę)
                print(f"📊 Wysłano {frame_count} ramek...")
            
            # ========== 1. POBIERZ RAMKĘ ==========
            try:
                frame = camera.get_frame()
            except Exception as e:
                print(f"❌ BŁĄD KAMERY: {e}")
                break
                
            h, w = frame.shape[:2]
            scale = TARGET_WIDTH / w
            new_h = int(h * scale)
            new_size = (TARGET_WIDTH, new_h)
            frame = cv2.resize(frame, new_size)
            
            # ========== 2. PRZETWARZANIE ==========
            if current_mode == "original":
                output_frame = frame
            else: 
                # Segmentacja
                try:
                    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    frame_pil = Image.fromarray(frame_rgb)
                    human, _ = Segmentation. segmentation(frame_pil, model)
                    human_pil = Image.fromarray(human)
                except Exception as e:
                    print(f"❌ BŁĄD SEGMENTACJI: {e}")
                    import traceback
                    traceback. print_exc()
                    output_frame = frame  # Fallback - zwróć oryginalną ramkę
                    current_mode = "original"
                    continue
                
                # Tryb:  BLUR
                if current_mode == "blur": 
                    try:
                        blurred_bg = cv2.GaussianBlur(frame, (35, 35), 0)
                        blurred_bg_rgb = cv2.cvtColor(blurred_bg, cv2.COLOR_BGR2RGB)
                        blurred_bg_pil = Image.fromarray(blurred_bg_rgb)
                        result = ChangeBackground. change_background(human_pil, blurred_bg_pil)
                    except Exception as e:
                        print(f"❌ BŁĄD BLUR: {e}")
                        output_frame = frame
                        continue
                
                # Tryb: COLOR
                elif current_mode == "color":
                    try:
                        hex_color = current_color.lstrip('#')
                        r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
                        color_bg = Image.new('RGB', new_size, (r, g, b))
                        result = ChangeBackground.change_background(human_pil, color_bg)
                    except Exception as e:
                        print(f"❌ BŁĄD COLOR: {e}")
                        output_frame = frame
                        continue
                
                # Tryb: IMAGE
                elif current_mode == "image":
                    try:
                        if current_bg_image is not None:
                            bg = ImageOps.fit(current_bg_image, new_size, method=Image.Resampling. LANCZOS)
                            result = ChangeBackground.change_background(human_pil, bg)
                        else:
                            blurred_bg = cv2.GaussianBlur(frame, (35, 35), 0)
                            blurred_bg_rgb = cv2.cvtColor(blurred_bg, cv2.COLOR_BGR2RGB)
                            blurred_bg_pil = Image.fromarray(blurred_bg_rgb)
                            result = ChangeBackground.change_background(human_pil, blurred_bg_pil)
                    except Exception as e: 
                        print(f"❌ BŁĄD IMAGE:  {e}")
                        output_frame = frame
                        continue
                else:
                    result = frame_pil
                
                # Konwersja z PIL do OpenCV
                try:
                    result_rgb = np.array(result)
                    output_frame = cv2.cvtColor(result_rgb, cv2.COLOR_RGB2BGR)
                except Exception as e:
                    print(f"❌ BŁĄD KONWERSJI: {e}")
                    output_frame = frame
            
            # ========== 3. ENKODUJ I WYŚLIJ ==========
            try:
                ret, buffer = cv2.imencode('.jpg', output_frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
                if not ret:
                    print("❌ Nie można enkodować ramki do JPEG")
                    continue
                    
                frame_bytes = buffer.tobytes()
                
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            except Exception as e:
                print(f"❌ BŁĄD WYSYŁANIA: {e}")
                break
        
        except GeneratorExit:
            print("\n🛑 Stream zamknięty przez klienta")
            break
        except Exception as e:
            print(f"\n❌ NIEZNANY BŁĄD: {e}")
            import traceback
            traceback.print_exc()
            break
    
    print("\n🎬 ========== STREAM ENDED ==========\n")


# ========== ENDPOINTY API ==========


@app.route('/set_mode', methods=['POST'])
def set_mode():
    """Zmień tryb przetwarzania (blur, color, image, original)"""
    global current_mode
    
    data = request.get_json()
    mode = data.get('mode', 'blur')
    
    if mode in ['blur', 'color', 'image', 'original']:
        current_mode = mode
        print(f"🔄 Tryb zmieniony na: {current_mode}")
        return jsonify({"status": "success", "mode": current_mode})
    else:
        return jsonify({"status": "error", "message":  "Invalid mode"}), 400


@app.route('/set_color', methods=['POST'])
def set_color():
    """Ustaw kolor tła (hex format, np.  #FF0000)"""
    global current_color, current_mode
    
    data = request. get_json()
    color = data.get('color', '#00FF00')
    
    current_color = color
    current_mode = "color"  # Automatycznie przełącz na tryb koloru
    print(f"🎨 Kolor tła:  {current_color}")
    
    return jsonify({"status":  "success", "color": current_color})


@app.route('/upload_bg', methods=['POST'])
def upload_bg():
    """Upload własnego tła (obraz)"""
    global current_bg_image, current_mode
    
    if 'image' not in request. files:
        return jsonify({"status": "error", "message": "No image file"}), 400
    
    file = request.files['image']
    
    if file.filename == '': 
        return jsonify({"status": "error", "message": "Empty filename"}), 400
    
    try:
        # Wczytaj obraz
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        current_bg_image = image
        current_mode = "image"  # Automatycznie przełącz na tryb obrazu
        
        print(f"🖼️ Wgrano tło: {file.filename}")
        return jsonify({"status": "success", "filename": file.filename})
    
    except Exception as e:
        print(f"❌ Błąd uploadu:  {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/status', methods=['GET'])
def status():
    """Sprawdź status serwera"""
    return jsonify({
        "status": "running",
        "mode": current_mode,
        "color": current_color,
        "has_custom_bg": current_bg_image is not None
    })


# ========== URUCHOMIENIE SERWERA ==========
if __name__ == "__main__":
    print("\n" + "="*50)
    print("🚀 BACKEND SERVER - BLUR BACKGROUND")
    print("="*50 + "\n")
    
    initialize()
    
    print("\n" + "="*50)
    print("✅ Serwer uruchomiony na http://localhost:5000")
    print("📡 Endpoints:")
    print("   - /video_feed    (stream wideo)")
    print("   - /set_mode      (POST:  blur/color/image/original)")
    print("   - /set_color     (POST: #RRGGBB)")
    print("   - /upload_bg     (POST: image file)")
    print("   - /status        (GET: status serwera)")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)