(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        const track = document.getElementById('marqueeTrack');
        if (!track) return;
        track.innerHTML = track.innerHTML + track.innerHTML;
    });
})();
