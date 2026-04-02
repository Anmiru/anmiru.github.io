// ══════════════════════════════════════════════════
// TAGS.JS — Sistema central de gêneros/tags
// Carrega data/tags.json e expõe funções globais
// ══════════════════════════════════════════════════

window.TAGS = {
    genres:  [],
    others:  { pt: 'Outros',    en: 'Others'  },
    season:  { pt: 'Temporada', en: 'Season'  },
    episode: { pt: 'Episódio',  en: 'Episode' },
    loaded:  false,
};

// Carrega o tags.json e inicializa
window.TAGS.load = function() {
    const base = (function() {
        const depth = window.location.pathname.split('/').length - 2;
        return depth > 0 ? '../'.repeat(depth) : '';
    })();
    return fetch(base + 'data/tags.json')
        .then(r => r.json())
        .then(data => {
            window.TAGS.genres  = data.genres  || [];
            window.TAGS.others  = data.others  || window.TAGS.others;
            window.TAGS.season  = data.season  || window.TAGS.season;
            window.TAGS.episode = data.episode || window.TAGS.episode;
            window.TAGS.loaded  = true;
            document.dispatchEvent(new CustomEvent('tagsLoaded'));
        })
        .catch(() => { window.TAGS.loaded = true; });
};

// Retorna a linguagem ativa
window.TAGS.lang = function() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'pt';
};

// Traduz um gênero pelo nome em PT
window.TAGS.translate = function(name) {
    const lang = window.TAGS.lang();
    const found = window.TAGS.genres.find(g => g.pt === name || g.en === name);
    if (found) return found[lang];
    return name;
};

// Retorna a classe CSS de um gênero pelo nome
window.TAGS.cssClass = function(name) {
    const found = window.TAGS.genres.find(g => g.pt === name || g.en === name);
    return found ? found.css : 'g-default';
};

// Retorna "Outros" ou "Others" conforme idioma
window.TAGS.others_label = function() {
    return window.TAGS.others[window.TAGS.lang()];
};

// Retorna "Temporada" ou "Season"
window.TAGS.season_label = function() {
    return window.TAGS.season[window.TAGS.lang()];
};

// Retorna "Episódio" ou "Episode"
window.TAGS.episode_label = function() {
    return window.TAGS.episode[window.TAGS.lang()];
};

// Retorna lista de gêneros no idioma atual
window.TAGS.list = function() {
    const lang = window.TAGS.lang();
    return window.TAGS.genres.map(g => ({ ...g, label: g[lang] }));
};

// Inicia o carregamento automaticamente
window.TAGS.load();
