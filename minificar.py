import subprocess
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

npx = r"C:\Program Files\nodejs\npx.cmd"

htmls = [
    "aninfo.html",
    "anlist.html",
    "home.html",
    "homepage.html",
    "index.html",
    "player.html",
    "updates.html",
]

js_files = [
    "js/script.js",
    "js/tags.js",
    "js/admin.js",
]

print("Minificando HTMLs e JSs do AnMi...\n")

for f in htmls:
    result = subprocess.run([
        npx, "html-minifier-terser", f, "-o", f,
        "--collapse-whitespace", "--remove-comments",
        "--minify-css", "true", "--minify-js", "true"
    ], capture_output=True, text=True)
    if result.returncode == 0:
        print(f"[OK] {f}")
    else:
        print(f"[ERRO] {f}")
        print(result.stderr)

for f in js_files:
    result = subprocess.run([
        npx, "terser", f, "-o", f, "--compress", "--mangle"
    ], capture_output=True, text=True)
    if result.returncode == 0:
        print(f"[OK] {f}")
    else:
        print(f"[ERRO] {f}")
        print(result.stderr)

print("\nPronto! Todos os arquivos minificados.")
input("Pressione Enter para fechar...")
