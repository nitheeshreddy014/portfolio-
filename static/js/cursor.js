(function () {
    'use strict';
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;
    const ring = document.getElementById('cursorRing');
    const dot = document.getElementById('cursorDot');
    const label = document.getElementById('cursorLabel');
    if (!ring || !dot) return;
    const TRAIL_COUNT = 6;
    const trail = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
        const d = document.createElement('div');
        d.className = 'cursor-trail-dot';
        d.style.opacity = (1 - i / TRAIL_COUNT) * 0.5;
        d.style.width = (4 - i * 0.4) + 'px';
        d.style.height = (4 - i * 0.4) + 'px';
        document.body.appendChild(d);
        trail.push({ el: d, x: 0, y: 0 });
    }
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY, dotX = mouseX, dotY = mouseY;
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('mousedown', () => ring.classList.add('click'));
    window.addEventListener('mouseup', () => ring.classList.remove('click'));
    function animate() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        dotX += (mouseX - dotX) * 0.55;
        dotY += (mouseY - dotY) * 0.55;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        if (label) label.style.transform = `translate(${dotX + 18}px, ${dotY + 18}px)`;
        let px = dotX, py = dotY;
        trail.forEach((t, i) => {
            t.x += (px - t.x) * (0.35 - i * 0.04);
            t.y += (py - t.y) * (0.35 - i * 0.04);
            t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
            px = t.x; py = t.y;
        });
        requestAnimationFrame(animate);
    }
    animate();
    function bindHover() {
        document.querySelectorAll('a, button, [data-modal], .skill-tag, .glass-card, input, textarea, .magnetic').forEach(el => {
            if (el.dataset.cursorBound === '1') return;
            el.dataset.cursorBound = '1';
            el.addEventListener('mouseenter', () => {
                ring.classList.add('hover');
                const customLabel = el.getAttribute('data-cursor');
                if (customLabel && label) { label.textContent = customLabel; label.classList.add('visible'); }
                else if (el.matches('[data-modal]') && label) { label.textContent = 'View'; label.classList.add('visible'); }
                else if (el.matches('a[target="_blank"]') && label) { label.textContent = 'Open'; label.classList.add('visible'); }
            });
            el.addEventListener('mouseleave', () => {
                ring.classList.remove('hover');
                if (label) { label.classList.remove('visible'); label.textContent = ''; }
            });
        });
    }
    bindHover();
    window.__rebindCursor = bindHover;
    function applyMagnetic() {
        document.querySelectorAll('.magnetic').forEach(m => {
            if (m.dataset.magneticBound === '1') return;
            m.dataset.magneticBound = '1';
            m.addEventListener('mousemove', (e) => {
                const r = m.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                m.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
            });
            m.addEventListener('mouseleave', () => { m.style.transform = 'translate(0, 0)'; });
        });
    }
    applyMagnetic();
    window.__rebindMagnetic = applyMagnetic;
})();
