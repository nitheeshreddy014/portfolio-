(function () {
    'use strict';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function splitElement(el) {
        if (el.dataset.split === 'done') return;
        const text = el.textContent.trim();
        if (!text) return;
        el.textContent = '';
        const frag = document.createDocumentFragment();
        [...text].forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'split-char';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.transitionDelay = (i * 0.03) + 's';
            if (reduced) span.classList.add('visible');
            frag.appendChild(span);
        });
        el.appendChild(frag);
        el.dataset.split = 'done';
    }
    function revealHeader(header) {
        header.classList.add('visible');
        header.querySelectorAll('.split-char').forEach(c => c.classList.add('visible'));
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-split-text]').forEach(el => {
            if (el.classList.contains('hero-name')) return;
            splitElement(el);
        });
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        revealHeader(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            document.querySelectorAll('.section-header').forEach(h => obs.observe(h));
        } else {
            document.querySelectorAll('.section-header').forEach(revealHeader);
        }
    });
})();
