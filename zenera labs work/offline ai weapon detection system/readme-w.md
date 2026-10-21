# Weapon Detection System — Documentation

Companion guide to the root [README](../README.md). Covers **setup**, **model
retraining**, and **deployment** for the offline/edge AI weapon detection system.

---

## 1. Setup Guide

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Python | 3.12+ | Backend runtime |
| [uv](https://docs.astral.sh/uv/) | latest | Python env + dependency manager |
| FFmpeg | any recent | Test-stream publishing (optional) |
| Docker Desktop / Compose v2 | 24+ / 2.x | Containerized deployment (optional) |
| Node.js + Expo tooling | Node 20+, Expo SDK 57 | Mobile app |
| MediaMTX | 1.x | Local RTSP test server (optional) |

### 1a. Backend (local)

```bash
cd server
uv sync                    # install dependencies
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

Swagger/OpenAPI is auto-generated at http://localhost:8000/docs.

Configuration is centralized in `server/config.py` and can be overridden with
`WEAPON_*` environment variables (e.g. `WEAPON_CONFIDENCE_THRESHOLD=0.4`,
`WEAPON_ALERT_CONFIDENCE_THRESHOLD=0.7`, `WEAPON_PROCESSING_FPS=5.0`).

### 1b. Add a camera

```bash
curl -X POST http://localhost:8000/cameras \
  -H "Content-Type: application/json" \
  -d '{"camera_id":"cam69","name":"Entrance","rtsp_url":"rtsp://localhost:8554/test"}'
```

Supported sources: any RTSP H.264 camera (`rtsp://user:pass@host:554/...`),
public test feeds, or a local MediaMTX loop of `test_video.mp4`.

### 1c. Local RTSP test feed (no camera hardware needed)

```bash
brew install mediamtx          # install once
cd <project-root>
mediamtx mediamtx.yml          # auto-publishes test_video.mp4 via runOnInit
```

The `mediamtx.yml` at the project root has a `runOnInit` that loops
`test_video.mp4` into the RTSP server automatically — no separate ffmpeg
terminal needed. The stream is available immediately at `rtsp://localhost:8554/test`.

For Docker, use `docker/mediamtx.yml` instead (`source: publisher`; ffmpeg
publishes from the host).

### 1d. Mobile app (Expo)

```bash
cd mobile-app
npm install
npx expo start            # scan QR with Expo Go (device on same LAN)
```

In the app's **Settings** tab set the backend URL (`http://<backend-ip>:8000`;
Android emulator uses `http://10.0.2.2:8000` by default, iOS simulator
`http://localhost:8000`). The backend must be reachable from the phone over the
same LAN.

### 1e. Tests

```bash
cd server
uv run pytest             # 15 API contract tests
```

---

## 2. Model Retraining Guide

Retraining is done in Google Colab (GPU) using the notebooks in
`server/model/`. The full pipeline:

### Step 1 — Data preparation

Merged YOLO dataset lives at `data/yolo/` (train/valid/test splits, single
`Weapon` class, `data.yaml` is portable — no absolute paths).

To rebuild from raw sources:

```bash
cd server
uv run python prepare_dataset.py   # merges data-raw/ into data/yolo/
```

To capture false positives from the current model for hard-negative mining:

```bash
uv run python hard_negative_mining.py
```

### Step 2 — Train

Open `server/model/retrain-v2.ipynb` in Colab (see also `train.py`):

- Base: `yolov8n.pt`, images 640×640
- v2 recipe: 150 epochs, patience 30, `lr0=0.005`, `mixup=0.15`,
  `copy_paste=0.1`, `erasing=0.5`, mosaic-off at epoch 15
- Monitor precision / recall / mAP50 / mAP50-95; add hard-negative images to
  the training set to drive down false positives

Reference baselines:

| Metric | v1 | v2 |
|--------|-----|-----|
| Precision | 83.95% | — |
| Recall | 75.67% | — |
| mAP50 | 81.91% | — |
| False positives (val) | 599 | 577 |

### Step 3 — Export & validate

```bash
cd server
uv run python export.py            # best.pt -> ONNX (opset 17, simplified)
```

`export.py` also validates that ONNX output matches PyTorch (IoU ≈ 0.98).

Place the exported model at `server/models/weapon-detector.onnx` (the default
runtime model) and restart the backend. Keep the `.pt` under
`train-results/weights/best.pt`.

---

## 3. Deployment Steps

### 3a. Docker (backend + RTSP relay)

A `Dockerfile` (`server/Dockerfile`) and `docker-compose.yml` are provided:

```bash
docker compose build
docker compose up -d
# Backend:  http://localhost:8000  |  RTSP relay: rtsp://localhost:8554
```

- `mediamtx` service exposes an RTSP endpoint for test feeds
  (`docker/mediamtx.yml` uses `source: publisher`; publish from the host with a
  `runOnInit`-free setup, e.g. the ffmpeg one-liner below).

  ```bash
  ffmpeg -re -stream_loop -1 -i test_video.mp4 -an -c copy \
    -rtsp_transport tcp -f rtsp rtsp://localhost:8554/test
  ```
- The backend starts with an empty database volume; register your cameras via
  the API after startup.
- Persist data in the named `wddata` volume if you want alerts to survive
  restarts; delete the volume for a clean slate.

Verify: `curl http://localhost:8000/health` → `{"status":"ok", ...}`.

### 3b. Production notes (bare metal / on-prem)

For an offline CCTV deployment:

1. **Ingestion** — point the backend at each camera's ONVIF/RTSP URL
   (`rtsp://user:pass@cam-ip:554/...`). Credentials can be embedded in the URL.
2. **Runtime** — run `uv run uvicorn main:app --host 0.0.0.0 --port 8000` under
   systemd (or `docker compose up -d`). One process handles multiple cameras
   (per-camera async loop, capped inference concurrency).
3. **Edge targets** — the ONNX model can additionally be exported to NCNN/CoreML
   for embedded inference; the Python backend is the reference implementation.
4. **Tuning live** — adjust sensitivity via `PUT /settings`
   (`confidence_threshold`, `alert_confidence_threshold`,
   `alert_cooldown_seconds`) without restarting.
5. **Networking** — keep cameras and the backend on the same LAN/VLAN; no cloud
   egress is required at inference time.

### 3c. Alerts & monitoring

- Real-time: connect to `ws://<host>:8000/ws/alerts` (JSON alert frames).
- History: `GET /alerts`, `GET /alerts/{id}/snapshot`, `POST /alerts/{id}/acknowledge`.
- Detection log: `GET /detections`.
- Mobile operator view: Live feed (per-camera), Alerts (with snapshots),
  Logs, and Settings — all over the LAN.

---

## Endpoint Reference (13 REST + 1 WebSocket)

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/health` | Health check |
| GET  | `/model/info` | Model metadata / effective thresholds |
| POST | `/detect/image` | Detect on an uploaded image |
| GET  | `/settings` | Runtime sensitivity settings |
| PUT  | `/settings` | Update sensitivity (live) |
| POST | `/cameras` | Register camera (auto-starts) |
| GET  | `/cameras` | List cameras |
| GET  | `/cameras/{id}/frame` | Live JPEG frame (mobile viewer) |
| DELETE | `/cameras/{id}` | Remove camera |
| POST | `/cameras/{id}/pause` | Pause camera processing |
| POST | `/cameras/{id}/resume` | Resume camera processing |
| GET  | `/alerts` | Paginated alert history |
| GET  | `/alerts/{id}/snapshot` | JPEG snapshot for an alert |
| POST | `/alerts/{id}/acknowledge` | Acknowledge an alert |
| GET  | `/detections` | Paginated detection log |
| GET  | `/status` | Server + per-camera status (incl. latency) |
| WS   | `/ws/alerts` | Real-time alert feed |