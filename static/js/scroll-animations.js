(function () {
    'use strict';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function init() {
        const hasGsap = !!(window.gsap && window.ScrollTrigger);
        if (hasGsap) window.gsap.registerPlugin(window.ScrollTrigger);
        if (hasGsap && !reduced) {
            document.querySelectorAll('[data-speed]').forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
                window.gsap.to(el, {
                    y: () => -100 * speed,
                    ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
                });
            });
        }
        const heroContent = document.getElementById('heroContent');
        const heroSection = document.getElementById('hero');
        if (heroContent && heroSection && !reduced) {
            let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
            heroSection.addEventListener('mousemove', (e) => {
                const r = heroSection.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                targetRY = x * 4;
                targetRX = -y * 4;
            });
            heroSection.addEventListener('mouseleave', () => { targetRX = 0; targetRY = 0; });
            function loop() {
                curRX += (targetRX - curRX) * 0.06;
                curRY += (targetRY - curRY) * 0.06;
                heroContent.style.transform = `perspective(1000px) rotateX(${curRX}deg) rotateY(${curRY}deg)`;
                requestAnimationFrame(loop);
            }
            loop();
        }
        const stats = document.querySelectorAll('.stat-number');
        let countersRun = false;
        function runCounters() {
            if (countersRun) return;
            countersRun = true;
            stats.forEach(el => {
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                const duration = 1800;
                const start = performance.now();
                function tick(now) {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString();
                    if (p < 1) requestAnimationFrame(tick);
                    else el.textContent = target.toLocaleString();
                }
                requestAnimationFrame(tick);
            });
        }
        if ('IntersectionObserver' in window) {
            const statObs = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) { runCounters(); statObs.disconnect(); } });
            }, { threshold: 0.3 });
            const statsCont = document.querySelector('.about-stats');
            if (statsCont) statObs.observe(statsCont);
        } else {
            setTimeout(runCounters, 1000);
        }
    }
    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
})();
