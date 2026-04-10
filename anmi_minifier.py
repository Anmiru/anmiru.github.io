import subprocess
import os
import sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# ── Detecta npx automaticamente (Windows e Linux/Mac) ──────────────────────
def find_npx():
    candidates = [
        r"C:\Program Files\nodejs\npx.cmd",
        r"C:\Program Files (x86)\nodejs\npx.cmd",
        "npx",  # PATH (Linux/Mac)
    ]
    for c in candidates:
        try:
            result = subprocess.run([c, "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                return c
        except FileNotFoundError:
            continue
    print("[ERRO] npx não encontrado. Instale o Node.js: https://nodejs.org")
    sys.exit(1)

npx = find_npx()

# ── Nova estrutura do site ──────────────────────────────────────────────────
htmls = [
    "index.html",
    "home/index.html",
    "aninfo/index.html",
    "anlist/index.html",
    "movies/index.html",
    "player/index.html",
    "updates/index.html",
]

js_files = [
    "js/script.js",
    "js/tags.js",
    "js/account-ui.js",
    "js/users.js",
]

# ── Minificação ─────────────────────────────────────────────────────────────
print("Minificando AnMi...\n")

# HTMLs — colapsa whitespace, remove comentários E minifica JS/CSS inline
# --minify-js com ecma 2018 suporta template literals, arrow functions, async/await
ok = 0
erros = 0

print("── HTML ──")
for f in htmls:
    if not os.path.exists(f):
        print(f"[SKIP] {f} (não encontrado)")
        continue
    result = subprocess.run([
        npx, "html-minifier-terser", f, "-o", f,
        "--collapse-whitespace",
        "--remove-comments",
        "--remove-optional-tags",
        "--remove-redundant-attributes",
        "--use-short-doctype",
        "--minify-css", "true",
        "--minify-js", '{"ecma":2018,"compress":true,"mangle":true}',
    ], capture_output=True, text=True)
    if result.returncode == 0:
        size = os.path.getsize(f)
        print(f"[OK] {f}  ({size:,} bytes)")
        ok += 1
    else:
        print(f"[ERRO] {f}")
        print(result.stderr[:400])
        erros += 1

print()
print("── JS ──")
for f in js_files:
    if not os.path.exists(f):
        print(f"[SKIP] {f} (não encontrado)")
        continue
    result = subprocess.run([
        npx, "terser", f, "-o", f,
        "--compress",
        "--mangle",
        "--ecma", "2018",
    ], capture_output=True, text=True)
    if result.returncode == 0:
        size = os.path.getsize(f)
        print(f"[OK] {f}  ({size:,} bytes)")
        ok += 1
    else:
        print(f"[ERRO] {f}")
        print(result.stderr[:400])
        erros += 1

print(f"\nPronto! {ok} arquivo(s) minificado(s), {erros} erro(s).")
input("Pressione Enter para fechar...")
