# 🎥 Blur Background - Inteligentne usuwanie/rozmywanie tła

Aplikacja webowa do przetwarzania wideo w czasie rzeczywistym z integracją OBS Studio.

## ✨ Funkcje

- 🌫️ **Rozmywanie tła** - automatyczne wykrywanie i rozmywanie tła
- 🎨 **Kolor tła** - zamiana tła na dowolny kolor
- 🖼️ **Własne tło** - upload własnego obrazu jako tło
- 📡 **Integracja z OBS** - kontroluj efekty w przeglądarce, streamuj do OBS
- 🚀 **Real-time** - przetwarzanie w czasie rzeczywistym

## 🚀 Szybki start

### 1. Instalacja zależności

#### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
```

#### Frontend (React)
```bash
cd blr
npm install
```

### 2. Uruchomienie

#### Uruchom backend
```bash
cd backend
python server.py
```

#### Uruchom frontend
```bash
cd blr
npm start
```

### 3. Otwórz w przeglądarce
```
http://localhost:3000
```

## 🎮 Integracja z OBS Studio

Chcesz streamować z efektami do OBS? Zobacz szczegółową instrukcję:

📖 **[OBS_SETUP.md](OBS_SETUP.md)** - Pełna instrukcja integracji z OBS

### Szybkie kroki:
1. Zainstaluj `pip install pyvirtualcam`
2. Uruchom aplikację w przeglądarce
3. Kliknij przycisk **OBS** (zielony)
4. W OBS dodaj źródło **Video Capture Device** → **OBS Virtual Camera**
5. Gotowe! Kontroluj efekty z przeglądarki

## 🛠️ Technologie

- **Backend**: Python, Flask, OpenCV, YOLO (segmentacja)
- **Frontend**: React, Framer Motion
- **OBS**: pyvirtualcam
- **AI**: Ultralytics YOLO11n

## 📁 Struktura projektu

```
blurBackground-InzynieriaOprogramowania/
├── backend/              # Backend Flask
│   ├── server.py        # Główny serwer + OBS integration
│   └── requirements.txt
├── blr/                 # Frontend React
│   └── src/
│       ├── CameraInterface.js  # Główny interfejs + kontrolki OBS
│       └── App.js
├── Camera/              # Moduł kamery
├── Segmentation/        # Moduł segmentacji YOLO
├── ChangeBackground/    # Moduł zmiany tła
├── Model/              # Modele YOLO
└── ProofOfConcept/     # Prototypy (virtualCamera.py)
```

## 🎨 Panel kontrolny

| Przycisk | Funkcja |
|----------|---------|
| ⏯️ | Play/Pause stream |
| 👤 | Rozmycie tła |
| 🎨 | Wybór koloru tła |
| 🖼️ | Upload własnego obrazu |
| ⚙️ | Reset (oryginalne wideo) |
| 🔴 | **Start/Stop OBS Virtual Camera** |

## 📡 API Endpoints

### Efekty wideo
- `GET /video_feed` - Stream wideo MJPEG
- `POST /set_mode` - Zmień tryb (blur/color/image/original)
- `POST /set_color` - Ustaw kolor tła
- `POST /upload_bg` - Upload obrazu tła
- `GET /status` - Status serwera

### OBS Virtual Camera
- `POST /obs/start` - Uruchom wirtualną kamerę
- `POST /obs/stop` - Zatrzymaj wirtualną kamerę
- `GET /obs/status` - Status wirtualnej kamery

## 🐛 Rozwiązywanie problemów

### Kamera nie działa
- Sprawdź czy żadna inna aplikacja nie używa kamery
- Zmień numer kamery w `backend/server.py` (camera_index)

### OBS nie działa
```bash
pip install pyvirtualcam
```

### Backend nie startuje
```bash
pip install -r backend/requirements.txt
```

## 👥 Autorzy

Studenci informatyki Politechniki Śląskiej w Gliwicach  
Projekt na przedmiot "Inżynieria Oprogramowania"

## 📄 Licencja

Zobacz [LICENSE](LICENSE)

---

**💡 Tip**: Przeczytaj [OBS_SETUP.md](OBS_SETUP.md) aby dowiedzieć się jak połączyć aplikację z OBS Studio!
