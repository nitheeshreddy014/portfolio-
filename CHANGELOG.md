# Changelog

## [2.6.0] — Anatomically Correct Brain · 2026-06-18

### 🧠 Brain Fix
The v2.5.0 brain rendered as a lumpy oval donut. v2.6.0 fixes the anatomy:

- **Two distinct hemispheres** separated by a central vertical fissure (the iconic brain split)
- **Left hemisphere** and **right hemisphere** generated separately, each with 80 outline + 60 interior nodes
- **Pronounced frontal lobe bumps** at top of each hemisphere (0.15 amplitude, up from 0.08)
- **Visible cerebellum** — small cluster of 20 nodes attached at (0, +0.85s) with radius 0.28s
- **Brain stem** — 6 nodes in a vertical line going from (0, 1.15s) to (0, 1.4s)
- **Wrinkly gyri texture** on outline (sin(t·13) × cos(t·7) × 0.05 jitter)
- **306 total nodes** (160 outline + 120 interior + 20 cerebellum + 6 stem)
- Brain scale increased: `Math.min(W, H) × 0.38` (was 0.32)
- Tighter connection threshold (`scale × 0.18`) preserves fissure visibility
- Pulse pool capped at 12 (was 8), spawn rate every 200ms (was 250ms)
- Hemisphere shift `side × 0.08` creates the central fissure gap

### Result
The shape now reads clearly as a brain — two halves, frontal lobes, cerebellum, stem — instead of a generic oval cloud.

---

## [2.5.0] — Neural Brain · 2026-06-18
- Single Neural Brain background replaces logo morphing constellation
- 120 wine nodes (60 outline + 60 interior) with synaptic connections + traveling pulses
- Removed 2D starfield and all logo shape generators

## [2.4.0] — Real Logo Silhouettes
- Rebuilt logo constellation with recognizable shapes (AWS, Docker, Python, etc.)

## [2.3.0] — Confident Edition
- Removed PORTFOLIO badge, typewriter, glitch
- Letter-by-letter fade-up name reveal
- "GenAI (Exploring)" → "GenAI & Agentic AI"
- "Areas of Exploration" → "Active Work"

## [2.2.0] — Visual Upgrade
- Aurora blobs, particle burst, hero spotlight, sparkles, ambient orbs
- Conic gradient borders, text shimmer, magnetic ripple

## [2.1.0] — Python Edition
- Added app.py (FastAPI), run.py (stdlib), static/ folder

## [2.0.0] — Enhanced Edition
- Lenis, GSAP, magnetic cursor, boot screen, 3D tilt cards, project modal

## [1.0.0] — Original
- Initial Wine & Noir portfolio
