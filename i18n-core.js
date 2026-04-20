/**
 * i18n.js - Internationalization Logic
 * Handles language switching and DOM updates using translations.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    // Function to update all strings in the UI
    window.updateUI = (lang) => {
        const dictionary = window.translations ? window.translations[lang] : null;
        if (!dictionary) return;

        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) {
                // Determine if we should use innerHTML (for titles/descriptions with <br> or spans)
                const isHTML = key.includes('title') || key.includes('description') || key.includes('footer') || key.includes('hero_title');
                if (isHTML) {
                    el.innerHTML = dictionary[key];
                } else {
                    el.textContent = dictionary[key];
                }
            }
        });

        // Update active language indicator correctly
        if (langText) langText.textContent = lang.toUpperCase();

        // Update HTML tag lang attribute
        document.documentElement.lang = lang;

        // Save preference in localStorage using the corrected 'language' key
        localStorage.setItem('language', lang);

        // Dispatch event for other components (like typewriter in script.js)
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    };

    // Initial load: determine language and apply it
    const savedLang = localStorage.getItem('language') || 'en';
    window.updateUI(savedLang);

    // Event Listener for the language toggle button
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            const current = localStorage.getItem('language') || 'en';
            const next = current === 'en' ? 'es' : 'en';
            window.updateUI(next);

            // Re-initialize icons just in case they were part of translated text
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }
});
