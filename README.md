# 🍷 Nitheesh Reddy — Portfolio

> _An Awwwards-caliber Wine & Noir personal portfolio — built with vanilla HTML, CSS & JavaScript._

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8b0000?style=flat)

---

## 📌 About

A personal portfolio website showcasing my work as a **Software Engineer** specializing in **Cloud, DevOps, and GenAI**. Built from scratch with a custom **Wine & Noir** aesthetic, premium animations, and Three.js-powered 3D background — fully static, no backend required.

🌐 **Live Site:** [https://nitheesh-portfolio.vercel.app](https://nitheesh-portfolio.vercel.app)

---

## ✨ Features

### 🎬 Animation System
- 🌀 **Smooth scroll** with Lenis synced to GSAP
- 🖱️ **Magnetic cursor** with wine-colored trail and contextual labels
- ⚡ **Boot screen** with mono `00 → 100` counter
- ✍️ **Letter-by-letter name reveal** with fade-up + blur effect
- 🌌 **Aurora blobs** floating on the landing page
- 💥 **Particle burst** on "Step Inside" click
- 🔦 **Hero spotlight** following the cursor
- ✨ **Twinkling sparkles** + **ambient orbs** in the background

### 🎨 Visual Polish
- 🎴 **3D tilt cards** with glare sweep on hover
- 🌟 **Conic gradient borders** on glass cards (animated)
- 🖋️ **Text shimmer** sweep on section titles
- 🎞️ **Infinite skills marquee** with diamond separators
- 🎬 **Project modal** with FLIP-style transitions
- 📊 **Animated counters** with comma formatting
- 🔊 **Optional UI sound toggle** (Web Audio API)

### ♿ Accessibility
- Full `prefers-reduced-motion` support
- Touch device detection (native cursor restored)
- ARIA labels and focus management
- Mobile-first responsive design

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Vanilla HTML5 / CSS3 / JavaScript (ES6) |
| **Animation** | GSAP 3.12.5 • ScrollTrigger • Lenis 1.0.42 |
| **Typography** | Playfair Display • Cormorant Garamond • Raleway • JetBrains Mono |
| **Icons** | Font Awesome 6.5.0 |
| **Hosting** | Vercel (Static Edge Network) |

> **No build step. No framework. No bundler.** All dependencies loaded from CDN.

---

## 📂 Folder Structure

\`\`\`
portfolio/
├── vercel.json              # Vercel routing config
├── README.md                # You are here
├── CHANGELOG.md             # Version history
├── LICENSE                  # MIT
├── .gitignore
│
└── static/                  # Everything served by Vercel
    ├── index.html
    ├── style.css            # Wine & Noir + all animations
    ├── script.js            # Main orchestrator
    │
    ├── js/                  # Animation modules
    │   ├── boot-screen.js
    │   ├── cursor.js
    │   ├── lenis-init.js
    │   ├── split-text.js
    │   ├── scroll-animations.js
    │   ├── tilt.js
    │   ├── modal.js
    │   ├── marquee.js
    │   └── sound.js
    │
    ├── assets/
    │   ├── favicon.svg
    │   └── noise.svg
    │
    └── docs/
        ├── README.md
        └── SCREENSHOTS.md
\`\`\`

---

## 🚀 Run Locally

Since this is a fully static site, you have a few easy options:

### Option 1: VS Code Live Server *(recommended)*
1. Install the **Live Server** extension by Ritwick Dey
2. Open the `static/` folder in VS Code
3. Right-click `index.html` → **"Open with Live Server"**

### Option 2: Python Built-in Server *(no install)*
\`\`\`bash
cd static
python -m http.server 8000
\`\`\`
Visit <http://localhost:8000>

### Option 3: Node `npx serve` *(if you have Node)*
\`\`\`bash
npx serve static
\`\`\`

---

## 🌐 Deployment (Vercel)

This site is deployed on **Vercel's free edge network**.

### How it works
- The root **`vercel.json`** tells Vercel to serve files from the `static/` folder
- No build step, no server — just edge-cached static files
- Auto-deploys on every push to the `main` branch

### To deploy your own copy
1. Fork this repository on GitHub
2. Sign up at [vercel.com](https://vercel.com) with GitHub
3. Click **"Add New Project"** → import your fork
4. Click **"Deploy"** — done in ~30 seconds

---

## 🎨 Customization

### Colors
Edit the CSS custom properties in `static/style.css`:

\`\`\`css
:root {
    --wine: #8b0000;
    --wine-light: #a52a2a;
    --noir: #0a0a0a;
    --cream: #f4e4c1;
}
\`\`\`

### Animation Tweaks
- **Boot counter speed:** `static/js/boot-screen.js` → `const duration = 1800;`
- **Cursor magnetism:** `static/js/cursor.js` → multipliers `0.2` / `0.25`
- **Tilt angle:** `static/js/tilt.js` → `const MAX_ANGLE = 8;`
- **Marquee speed:** `static/style.css` → `marqueeScroll 45s`

---

## ⚡ Performance

- ✅ **No build step** — files served as-is from Vercel's edge network
- ✅ **CDN-only dependencies** — GSAP, Lenis, Font Awesome loaded from CDNs
- ✅ **Mobile-aware** — heavy animations disabled on screens `< 968px` and touch devices
- ✅ **`prefers-reduced-motion`** — fully respected (all keyframes, transitions disabled)
- ✅ **Lazy-loaded backgrounds** — heavy effects load only after the user clicks "Step Inside"

**Target Lighthouse:** Performance `≥ 90` • Accessibility `≥ 95` • Best Practices `100` • SEO `100`

---

## 🙏 Credits

- **GSAP & ScrollTrigger** — [GreenSock](https://gsap.com)
- **Lenis** — [Darkroom Engineering](https://lenis.darkroom.engineering)
- **Font Awesome** — [fontawesome.com](https://fontawesome.com)
- **Inspiration:** Bruno Simon, Active Theory, Lusion.co, [Awwwards](https://awwwards.com) SOTD winners

---

## 📞 Contact

- 📧 **Email:** Nitheeshreddy014@gmail.com
- 📱 **Phone:** +91 9398161844
- 💼 **LinkedIn:** [linkedin.com/in/nitheeshreddy014](https://linkedin.com/in/nitheeshreddy014)
- 🐙 **GitHub:** [github.com/nitheeshreddy014](https://github.com/nitheeshreddy014)
- 📍 **Location:** Hyderabad, India

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <em>Crafted with passion in the Wine & Noir aesthetic.</em><br/>
  <strong>Pocharam Nitheesh Reddy</strong> · Hyderabad · 2025
</p>