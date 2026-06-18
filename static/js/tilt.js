(function () {
    'use strict';
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;
    const MAX_ANGLE = 8;
    function setupTilt(card) {
        if (card.dataset.tiltReady === '1') return;
        card.dataset.tiltReady = '1';
        let glare = card.querySelector('.tilt-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);
        }
        let targetRX = 0, targetRY = 0;
        let curRX = 0, curRY = 0;
        let glareX = 50, glareY = 50;
        let raf = null;
        function loop() {
            curRX += (targetRX - curRX) * 0.12;
            curRY += (targetRY - curRY) * 0.12;
            card.style.transform = `perspective(1000px) rotateX(${curRX}deg) rotateY(${curRY}deg) translateZ(0)`;
            card.style.setProperty('--glare-x', glareX + '%');
            card.style.setProperty('--glare-y', glareY + '%');
            if (Math.abs(curRX - targetRX) > 0.01 || Math.abs(curRY - targetRY) > 0.01) {
                raf = requestAnimationFrame(loop);
            } else { raf = null; }
        }
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            targetRY = (x - 0.5) * 2 * MAX_ANGLE;
            targetRX = -(y - 0.5) * 2 * MAX_ANGLE;
            glareX = x * 100; glareY = y * 100;
            if (!raf) raf = requestAnimationFrame(loop);
        });
        card.addEventListener('mouseleave', () => {
            targetRX = 0; targetRY = 0; glareX = 50; glareY = 50;
            if (!raf) raf = requestAnimationFrame(loop);
        });
    }
    function init() { document.querySelectorAll('[data-tilt]').forEach(setupTilt); }
    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
    window.__rebindTilt = init;
})();
