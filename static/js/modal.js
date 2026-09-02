(function () {
    'use strict';
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    if (!modal || !body || !closeBtn) return;
    let lastFocus = null;
    function openModal(card) {
        const title = card.getAttribute('data-title') || (card.querySelector('h3') ? card.querySelector('h3').textContent : 'Project');
        const tagsStr = card.getAttribute('data-tags') || '';
        const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
        const link = card.getAttribute('data-link') || '';
        const iconEl = card.querySelector('.project-icon');
        const iconHTML = iconEl ? iconEl.innerHTML : '';
        const descEl = card.querySelector('p');
        const desc = descEl ? descEl.textContent : '';
        body.innerHTML =
            '<div class="modal-icon">' + iconHTML + '</div>' +
            '<h2 class="modal-title">' + title + '</h2>' +
            '<p class="modal-description">' + desc + '</p>' +
            '<div class="modal-tags">' + tags.map(t => '<span>' + t + '</span>').join('') + '</div>' +
            (link ? '<a href="' + link + '" target="_blank" rel="noopener" class="modal-link magnetic"><span>View Project</span> <i class="fas fa-external-link-alt"></i></a>' : '');
        lastFocus = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn.focus(), 100);
        if (window.__rebindCursor) window.__rebindCursor();
        if (window.__rebindMagnetic) window.__rebindMagnetic();
    }
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }
    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-modal]');
        if (card && !e.target.closest('.project-link') && !e.target.closest('a')) {
            e.preventDefault();
            openModal(card);
        }
    });
    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.project-modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
})();
