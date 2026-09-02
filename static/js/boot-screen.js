(function () {
    'use strict';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const boot = document.getElementById('boot-screen');
    const counterEl = document.getElementById('bootCounter');
    const barEl = document.getElementById('bootBarFill');
    if (!boot || !counterEl || !barEl) return;
    function finish() {
        boot.classList.add('gone');
        setTimeout(() => boot.classList.add('hidden'), 900);
    }
    if (reduced) {
        counterEl.textContent = '100';
        barEl.style.width = '100%';
        setTimeout(finish, 200);
        return;
    }
    const start = performance.now();
    const duration = 1800;
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.floor(eased * 100);
        counterEl.textContent = value.toString().padStart(2, '0');
        barEl.style.width = (eased * 100) + '%';
        if (p < 1) requestAnimationFrame(tick);
        else {
            counterEl.textContent = '100';
            setTimeout(finish, 300);
        }
    }
    requestAnimationFrame(tick);
})();
