// ==UserScript==
// @name         YouTube Shorts Redirector
// @namespace    https://github.com/jmesidor37
// @version      1.0
// @description  Hides Youtube Shorts shelves and redirects Shorts links to the normal video player.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // hide shorts with css
    const style = document.createElement('style');
    style.textContent = `
    /* hide shorts shlves on the home page */
        ytd-rich-shelf-renderer[is-shorts],
        ytd-reel-shelf-renderer {
            display: none !important;
        }

        /* hide shorts button in the left sidebar */
        ytd-guide-entry-renderer:has(a[title="Shorts"]),
        ytd-guide-entry-renderer"has(a[href="/shorts/"]),
        ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
        ytd-mini-guide-entry-renderer:has(a[href="/shorts/"]) {
            display: none !important:
}
    `;
    document.head.appendChild(style);

    // redirect shorts links to normal video player
    function redirectShorts() {
        const url = window.location.pathname;
        if (url.startsWith('/shorts/')) {
            const videoId = url.split('/shorts/')[1];
            window.location.replace('https://www.youtube.com/watch?v=${videoId}');
        }
    }

    redirectShorts();
    document.addEventListener('yt-navigate-finish', redirectShorts);
})();