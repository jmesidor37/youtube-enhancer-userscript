// ==UserScript==
// @name         YouTube Enhancer (No Shorts + Real Dates)
// @namespace    https://github.com/jmesidor37
// @version      1.1
// @description  Hides YouTube Shorts and shows real calendar dates instead of relative times.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // 1. HIDE SHORTS & REDIRECT
    // ==========================================
    const style = document.createElement('style');
    style.textContent = `
        /* Hide Shorts shelves on the home page */
        ytd-rich-shelf-renderer[is-shorts],
        ytd-reel-shelf-renderer {
            display: none !important;
        }
        /* Hide the Shorts button in the sidebar */
        ytd-guide-entry-renderer:has(a[href^="/shorts"]),
        ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
        ytd-guide-entry-renderer:has(a[title="Shorts"]),
        ytd-mini-guide-entry-renderer:has(a[title="Shorts"]) {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    function redirectShorts() {
        if (window.location.pathname.startsWith('/shorts/')) {
            const videoId = window.location.pathname.split('/')[2];
            window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
        }
    }
    redirectShorts();
    document.addEventListener('yt-navigate-finish', redirectShorts);

    // ==========================================
    // 2. REAL UPLOAD DATES
    // ==========================================
    function calculateRealDate(timeText) {
        const match = timeText.match(/(\d+)\s*(s|m|h|d|w|mo|y|second|minute|hour|day|week|month|year)s?\s+ago/i);
        if (!match) return null;
        
        const amount = parseInt(match[1]);
        let unit = match[2].toLowerCase();
        if (unit === 's') unit = 'second';
        if (unit === 'm') unit = 'minute';
        if (unit === 'h') unit = 'hour';
        if (unit === 'd') unit = 'day';
        if (unit === 'w') unit = 'week';
        if (unit === 'mo') unit = 'month';
        if (unit === 'y') unit = 'year';

        const date = new Date();
        if (unit === 'second') date.setSeconds(date.getSeconds() - amount);
        if (unit === 'minute') date.setMinutes(date.getMinutes() - amount);
        if (unit === 'hour') date.setHours(date.getHours() - amount);
        if (unit === 'day') date.setDate(date.getDate() - amount);
        if (unit === 'week') date.setDate(date.getDate() - (amount * 7));
        if (unit === 'month') date.setMonth(date.getMonth() - amount);
        if (unit === 'year') date.setFullYear(date.getFullYear() - amount);
        
        // Returns format like "Nov 11, 2026"
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function processPage() {
        try {
            const cards = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer');
            
            cards.forEach(card => {
                // Find any text that says "ago" and replace it
                const spans = card.querySelectorAll('span');
                spans.forEach(span => {
                    if (span.textContent.includes('ago') && !span.hasAttribute('data-date-added')) {
                        const realDate = calculateRealDate(span.textContent);
                        if (realDate) {
                            span.setAttribute('data-date-added', 'true');
                            span.textContent = `${span.textContent.trim()} (${realDate})`;
                            span.style.color = '#aaa'; 
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Script Error:", error);
        }
    }

    // Run constantly to catch new videos as you scroll
    const observer = new MutationObserver(() => { processPage(); });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(processPage, 1500);
    document.addEventListener('yt-navigate-finish', () => setTimeout(processPage, 1000));

})();