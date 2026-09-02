(function () {
    'use strict';
    const toggleBtn = document.getElementById('soundToggle');
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    let enabled = localStorage.getItem('sound-enabled') === '1';
    let ctx = null;
    function updateUI() {
        if (enabled) {
            toggleBtn.classList.add('active');
            if (icon) { icon.classList.remove('fa-volume-mute'); icon.classList.add('fa-volume-up'); }
        } else {
            toggleBtn.classList.remove('active');
            if (icon) { icon.classList.remove('fa-volume-up'); icon.classList.add('fa-volume-mute'); }
        }
    }
    updateUI();
    function ensureCtx() {
        if (!ctx) {
            try {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (AC) ctx = new AC();
            } catch (e) { ctx = null; }
        }
        return ctx;
    }
    function playTone(freq, duration, volume) {
        if (!enabled) return;
        const c = ensureCtx();
        if (!c) return;
        try {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, c.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.4, c.currentTime + duration / 1000);
            gain.gain.setValueAtTime(volume, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration / 1000);
            osc.connect(gain).connect(c.destination);
            osc.start();
            osc.stop(c.currentTime + duration / 1000);
        } catch (e) {}
    }
    function playClick() { playTone(880, 80, 0.05); }
    function playHover() { playTone(660, 40, 0.02); }
    toggleBtn.addEventListener('click', () => {
        enabled = !enabled;
        localStorage.setItem('sound-enabled', enabled ? '1' : '0');
        updateUI();
        if (enabled) playClick();
    });
    document.addEventListener('click', (e) => {
        const el = e.target.closest('button, a, .magnetic, [data-modal]');
        if (el && el.id !== 'soundToggle') playClick();
    });
    document.addEventListener('mouseenter', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('nav-link')) playHover();
    }, true);
})();
