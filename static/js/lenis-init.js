(function () {
    'use strict';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    function initLenis() {
        if (typeof window.Lenis === 'undefined') return;
        const lenis = new window.Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
        });
        window.lenis = lenis;
        if (window.gsap && window.ScrollTrigger) {
            lenis.on('scroll', window.ScrollTrigger.update);
            window.gsap.ticker.add((time) => lenis.raf(time * 1000));
            window.gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
            requestAnimationFrame(raf);
        }
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -70 }); }
                }
            });
        });
    }
    if (document.readyState === 'complete') initLenis();
    else window.addEventListener('load', initLenis);
})();
