# CSS Mobile — AnMi

Pasta `css/mobile/` contém os estilos exclusivos para Android/dispositivos móveis,
completamente **separados** dos estilos de PC.

## Arquivos

| Arquivo                  | Página correspondente | Breakpoint principal |
|--------------------------|----------------------|----------------------|
| `home.mobile.css`        | `home.html`          | ≤ 768px              |
| `aninfo.mobile.css`      | `aninfo.html`        | ≤ 768px              |
| `anlist.mobile.css`      | `anlist.html`        | ≤ 900px              |
| `player.mobile.css`      | `player.html`        | ≤ 900px              |

---

## Como incluir nos HTMLs

Adicione a `<link>` do mobile **depois** do CSS principal da página,
usando o atributo `media` para carregá-lo somente em telas pequenas.
Isso garante que o PC nunca carrega o CSS mobile.

### home.html
```html
<link rel="stylesheet" href="css/home2.css">
<link rel="stylesheet" href="css/mobile/home.mobile.css" media="(max-width: 768px)">
```

### aninfo.html
```html
<link rel="stylesheet" href="css/aninfo.css">
<link rel="stylesheet" href="css/mobile/aninfo.mobile.css" media="(max-width: 768px)">
```

### anlist.html
```html
<link rel="stylesheet" href="css/anlist.css">
<link rel="stylesheet" href="css/mobile/anlist.mobile.css" media="(max-width: 900px)">
```

### player.html
```html
<link rel="stylesheet" href="css/player.css">
<link rel="stylesheet" href="css/mobile/player.mobile.css" media="(max-width: 900px)">
```

---

## O que foi separado

### `home.mobile.css`
- Navbar compacta (52px → 48px), links ocultos
- Spotlight: capa lateral e kanji removidos, botões empilhados, fontes reduzidas
- Catálogo: toolbar vertical, chips roláveis horizontalmente, grid 3 colunas
- Cards: hover desativado, tap effect ativado
- Overlay login e modal novidades: width adaptado
- Toque: `touch-action: manipulation` em todos os elementos clicáveis, área mínima de 44px

### `aninfo.mobile.css`
- Header fixo 48px, botão voltar compacto
- Card principal em coluna única, capa centralizada (180px)
- Abas Sinopse/Informações: tab flexível, largura 100%
- Grade de informações: coluna única
- Seção de episódios: padding reduzido
- Comentários: avatar menor, texto alinhado à esquerda

### `anlist.mobile.css`
- Layout: sidebar empilhada acima do grid (sem sticky)
- Sidebar: flex-row, blocos crescem proporcionalmente, chips roláveis
- Grid: `minmax(140px)` → `minmax(120px)` → 3 colunas fixas
- Cards: hover off, tap effect on
- Paginação: centralizada, botões menores

### `player.mobile.css`
- Layout: grade única coluna (player → info bar → episódios)
- Player: sem border-radius nas bordas laterais em ≤520px
- Controles videojs: botões maiores para touch, volume panel oculto
- Painel de episódios: max-height 280px, posição estática
- Comentários: padding zero nas bordas em ≤520px
- Toque: área mínima 44px em todos os botões

---

## Estratégia de overrides

Os arquivos mobile **sobrescrevem** apenas o necessário.
Todo o design system (variáveis CSS, cores, fontes) vem dos arquivos principais.
Isso significa que ao editar uma cor ou fonte no CSS principal, ela atualiza
automaticamente em desktop e mobile.
