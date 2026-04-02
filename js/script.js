let translations = {};

function loadLanguage(lang) {
    localStorage.setItem('language', lang);

    fetch(`${getBasePath()}lang/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            translations = data;
            // Expõe globalmente para páginas que registram listeners após o evento
            window._anmiTranslations = data;
            updateTexts();
            document.dispatchEvent(new CustomEvent('translationsLoaded', { detail: data }));
        })
        .catch(err => console.error('Erro ao carregar traduções:', err));
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.textContent = translations[key];
    });
    // Atualiza placeholders que têm data-i18n-placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[key]) el.placeholder = translations[key];
    });
}

function getStoredLanguage() {
    return localStorage.getItem('language') || 'pt_BR';
}

function getBasePath() {
    const depth = window.location.pathname.split('/').length - 2;
    return depth > 0 ? '../'.repeat(depth) : '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(getStoredLanguage());

    const btnPT = document.getElementById('btn-pt');
    const btnEN = document.getElementById('btn-en');

    if (btnPT) btnPT.addEventListener('click', () => loadLanguage('pt_BR'));
    if (btnEN) btnEN.addEventListener('click', () => loadLanguage('en'));
});
