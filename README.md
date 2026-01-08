# Multibook Resource Styleguide

Styleguide i dokumentacja design systemu EDR. Projekt zawiera komponenty CSS (przyciski, typografia, kolory) oraz interaktywną dokumentację.

## Struktura projektu

```
src/
├── styles/
│   ├── variables.css    # Zmienne CSS (kolory, radiusy)
│   ├── typography.css   # Klasy typografii (.t-*)
│   ├── buttons.css      # Klasy przycisków (.c-btn-*)
│   ├── app.css          # Style aplikacji dokumentacji
│   └── index.css        # Entry point CSS
├── components/          # Komponenty Vue dokumentacji
└── App.vue              # Główny komponent styleguide
```

## Użycie CSS

### Kolory

Zmienne CSS dla kolorów:
```css
var(--color-brand-700)    /* Primary brand */
var(--color-gray-700)     /* Secondary */
var(--color-error-600)    /* Error */
var(--color-success-500)  /* Success */
var(--color-warning-500)  /* Warning */
```

### Typografia

Klasy rozmiaru:
```html
<p class="t-2xl">Display 2XL</p>
<p class="t-xl">Display XL</p>
<p class="t-lg">Display LG</p>
<p class="t-md">Display MD</p>
<h1 class="t-h1">Heading 1</h1>
<h2 class="t-h2">Heading 2</h2>
<h3 class="t-h3">Heading 3</h3>
<p class="t-body-l">Body Large</p>
<p class="t-body-m">Body Medium</p>
<p class="t-body-s">Body Small</p>
<span class="t-caption">Caption</span>
<span class="t-label">LABEL</span>
```

Klasy grubości (używaj razem z rozmiarem):
```html
<p class="t-h1 t-font-regular">Regular 400</p>
<p class="t-h1 t-font-medium">Medium 500</p>
<p class="t-h1 t-font-semibold">Semibold 600</p>
<p class="t-h1 t-font-bold">Bold 700</p>
```

### Przyciski

Struktura klasy: `.c-btn` + rozmiar + kolor/styl

**Rozmiary:**
- `.c-btn-sm` - Small (36px)
- `.c-btn-md` - Medium (40px)
- `.c-btn-lg` - Large (48px)

**Kolory i style:**
- `.c-btn-primary` / `.c-btn-primary-outline` / `.c-btn-primary-ghost`
- `.c-btn-secondary` / `.c-btn-secondary-outline` / `.c-btn-secondary-ghost`
- `.c-btn-tertiary` / `.c-btn-tertiary-outline` / `.c-btn-tertiary-ghost`
- `.c-btn-error` / `.c-btn-error-outline` / `.c-btn-error-ghost`

**Przykłady:**
```html
<!-- Podstawowy przycisk -->
<button class="c-btn c-btn-md c-btn-primary">Tekst</button>

<!-- Przycisk z ikoną -->
<button class="c-btn c-btn-md c-btn-primary">
  <i class="ph ph-plus"></i>
  Dodaj
</button>

<!-- Przycisk icon-only -->
<button class="c-btn c-btn-md c-btn-icon c-btn-primary">
  <i class="ph ph-plus"></i>
</button>

<!-- Full width -->
<button class="c-btn c-btn-md c-btn-primary c-btn-block">Full width</button>
```

### Ikony

Projekt używa [Phosphor Icons](https://phosphoricons.com/) przez CDN.

```html
<!-- Regular -->
<i class="ph ph-plus"></i>
<i class="ph ph-arrow-right"></i>
<i class="ph ph-trash"></i>

<!-- Fill -->
<i class="ph-fill ph-heart"></i>
<i class="ph-fill ph-star"></i>
```

## Development

```bash
# Instalacja zależności
pnpm install

# Development server
pnpm dev

# Build produkcyjny
pnpm build

# Type check
pnpm type-check

# Zbuduj CSS do dystrybucji
pnpm build:css
```

## Eksport CSS

Aby użyć CSS w innym projekcie:

1. Zbuduj CSS: `pnpm build:css`
2. Skopiuj `dist/styles.css` do docelowego projektu
3. Dodaj Phosphor Icons CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css" />
```

## Technologie

- Vue 3 + TypeScript
- Vite
- Phosphor Icons (CDN)
