# 🍷 Nitheesh Reddy — Portfolio (Python Edition v2.6.0)

> _An Awwwards-caliber Wine & Noir portfolio with an anatomically-correct Neural Brain — served with Python._

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi&logoColor=white)
![Version](https://img.shields.io/badge/Version-2.6.0-8b0000?style=flat)
![License](https://img.shields.io/badge/License-MIT-555555?style=flat)

---

## 💡 Important Clarification

**JavaScript runs in your browser, not on your machine.** Python just serves the files — your browser runs the animations.

---

## 🚀 Step 1 — Run Locally First

### Option A: Zero Dependencies
```bash
cd portfolio-python
python run.py
```
Browser auto-opens at <http://localhost:8000>.

### Option B: FastAPI
```bash
cd portfolio-python
pip install -r requirements.txt
python app.py
```

### ✅ Verify locally
- [ ] Boot screen counter `00 → 100`
- [ ] Wine cursor visible on landing
- [ ] Aurora blobs floating
- [ ] "Step Inside" → particle burst
- [ ] Name reveals letter-by-letter
- [ ] **NEW v2.6.0:** Brain background actually LOOKS like a brain — two hemispheres, central fissure, frontal lobes, cerebellum below, brain stem trailing down
- [ ] Smooth scroll, modals, sound toggle

---

## 🌐 Step 2 — Deploy to Render

```bash
cd portfolio-python
git init && git add . && git commit -m "Portfolio v2.6.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-python.git
git push -u origin main
```

Then **Render Dashboard → New → Web Service**:

| Field | Value |
|-------|-------|
| Build | `pip install -r requirements.txt` |
| Start | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
| Instance | Free |

Live at `https://nitheesh-portfolio.onrender.com` in 3-5 min.

---

## ✨ What's New in v2.6.0 — Anatomically Correct Brain

The v2.5.0 brain looked like a "lumpy oval donut." v2.6.0 fixes that with proper anatomy:

### 🧠 Real Brain Anatomy
- **Two distinct hemispheres** separated by a central vertical fissure (the most iconic brain feature)
- **Pronounced frontal lobe bumps** at the top of each hemisphere (0.15 amplitude)
- **Visible cerebellum** — small cluster of 20 nodes attached below the main brain
- **Brain stem** — 6 nodes trailing vertically below the cerebellum
- **Wrinkly gyri texture** on the outline (the brain's characteristic ridges)
- **306 total nodes** (160 outline + 120 interior + 20 cerebellum + 6 stem)
- Larger overall — `scale = min(W,H) × 0.38`
- Tighter connection threshold (scale × 0.18) preserves the fissure visibility

### Still Same
- Wine pulses traveling along synapses
- Gentle node breathing
- Wine & Noir color palette
- All other portfolio features

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Server | Python 3.11+ • FastAPI 0.115 |
| Frontend | Vanilla HTML/CSS/JS |
| Animation | GSAP 3.12.5 • Lenis 1.0.42 |
| Background | Canvas 2D Anatomical Brain |

---

## 🎨 Customization

In `static/script.js → loadNeuralBrain()`:
- **Brain scale:** `Math.min(W, H) * 0.38`
- **Outline density per hemisphere:** `80`
- **Interior density per hemisphere:** `60`
- **Cerebellum nodes:** `20`
- **Brain stem nodes:** `6`
- **Connection threshold:** `scale * 0.18`
- **Pulse spawn rate:** `setInterval(spawnPulse, 200)`

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

<p align="center">
  <em>Crafted with passion in the Wine & Noir aesthetic.</em><br/>
  <strong>Pocharam Nitheesh Reddy</strong> · Hyderabad · 2025
</p>
