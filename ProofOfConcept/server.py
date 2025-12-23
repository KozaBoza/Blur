from flask import Flask, Response
from flask_cors import CORS
import cv2
from ultralytics import YOLO
from camera import Camera
from blurredCamera import BlurBackground

app = Flask(__name__)
CORS(app)  

model = YOLO("yolov8n-seg.pt")
try:
    cam = Camera(camera_id=0) #do zmiany?
    print("Doneee")
except Exception as e:
    print(f"Error : {e}")
    cam = None

def generate_frames():
    while True:
        if cam is None:
            break
        try:
            frame = cam.get_frame()
            processed_frame = BlurBackground.blur_background(frame, model)

            ret, buffer = cv2.imencode('.jpg', processed_frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        except Exception as e:
            print(f"Error: {e}")
            break

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)