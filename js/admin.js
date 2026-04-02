// ══════════════════════════════════════════════════
// ADMIN.JS — Lógica do perfil/admin
// Detecta se painel.html existe na raiz.
// Se existir: mostra botão e ativa login.
// Se não existir: botão permanece oculto.
// ══════════════════════════════════════════════════

(function() {
    const ADMIN_USER  = 'admin';
    const ADMIN_PASS  = 'anmi2025';
    const SESSION_KEY = 'anmi_admin_ok';

    function isLogged() {
        return sessionStorage.getItem(SESSION_KEY) === '1';
    }

    function getBasePath() {
        const depth = window.location.pathname.split('/').length - 2;
        return depth > 0 ? '../'.repeat(depth) : '';
    }

    // Verifica se painel.html existe
    fetch(getBasePath() + 'painel.html', { method: 'HEAD' })
        .then(r => {
            if (r.ok) {
                initAdmin();
            } else {
                // 404 — garante que o botão fica oculto
                const btn = document.getElementById('profileBtn');
                if (btn) btn.style.display = 'none';
            }
        })
        .catch(() => {
            // Sem acesso — garante ocultação
            const btn = document.getElementById('profileBtn');
            if (btn) btn.style.display = 'none';
        });

    function initAdmin() {
        const profileBtn   = document.getElementById('profileBtn');
        const profileDot   = document.getElementById('profileDot');
        const loginOverlay = document.getElementById('loginOverlay');
        const loginClose   = document.getElementById('loginClose');
        const loginBtn     = document.getElementById('loginBtn');
        const logoutBtn    = document.getElementById('logoutBtn');
        const loginError   = document.getElementById('loginError');
        const loginView    = document.getElementById('loginView');
        const loggedView   = document.getElementById('loggedView');
        const pwEye        = document.getElementById('pwEye');
        const loginPass    = document.getElementById('loginPass');
        const loginUser    = document.getElementById('loginUser');

        if (!profileBtn) return;

        // Mostra o botão
        profileBtn.style.display = '';

        function updateProfileState() {
            if (!profileDot) return;
            profileDot.style.display = isLogged() ? 'block' : 'none';
            profileBtn.classList.toggle('profile-logged', isLogged());
            if (loginView)  loginView.style.display  = isLogged() ? 'none'  : 'block';
            if (loggedView) loggedView.style.display = isLogged() ? 'block' : 'none';
        }

        function openLogin() {
            if (!loginOverlay) return;
            loginOverlay.classList.add('open');
            if (loginError) loginError.textContent = '';
            updateProfileState();
            if (!isLogged() && loginUser) setTimeout(() => loginUser.focus(), 120);
        }

        function closeLogin() {
            if (loginOverlay) loginOverlay.classList.remove('open');
        }

        function doLogin() {
            if (!loginUser || !loginPass) return;
            const u = loginUser.value.trim();
            const p = loginPass.value;
            if (u === ADMIN_USER && p === ADMIN_PASS) {
                sessionStorage.setItem(SESSION_KEY, '1');
                if (loginError) loginError.textContent = '';
                updateProfileState();
            } else {
                if (loginError) loginError.textContent = 'Usuário ou senha incorretos.';
                loginPass.value = '';
                loginPass.focus();
                const modal = document.getElementById('loginModal');
                if (modal) {
                    modal.classList.add('shake');
                    setTimeout(() => modal.classList.remove('shake'), 500);
                }
            }
        }

        profileBtn.addEventListener('click', openLogin);
        if (loginClose)  loginClose.addEventListener('click', closeLogin);
        if (loginBtn)    loginBtn.addEventListener('click', doLogin);
        if (logoutBtn)   logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem(SESSION_KEY);
            updateProfileState();
            closeLogin();
        });
        if (loginPass) {
            loginPass.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
        }
        if (loginUser) {
            loginUser.addEventListener('keydown', e => { if (e.key === 'Enter' && loginPass) loginPass.focus(); });
        }
        if (loginOverlay) {
            loginOverlay.addEventListener('click', e => { if (e.target === loginOverlay) closeLogin(); });
        }
        if (pwEye && loginPass) {
            pwEye.addEventListener('click', () => {
                const isText = loginPass.type === 'text';
                loginPass.type = isText ? 'password' : 'text';
                pwEye.querySelector('svg').style.opacity = isText ? '1' : '0.5';
            });
        }

        updateProfileState();
    }
})();
