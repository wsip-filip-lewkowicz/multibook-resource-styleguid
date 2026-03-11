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

# Lint
pnpm lint

# Format
pnpm format
```

## Build CSS i JS

Projekt używa systemu bundlowania zarządzanego przez `scripts/bundle-config.ts`.

### Komendy

```bash
# Zbuduj wszystkie assety (CSS + JS)
pnpm build:assets

# Zbuduj tylko CSS
pnpm build:css

# Zbuduj tylko JS
pnpm build:js

# Zbuduj tylko globalny bundle (bez standalone)
pnpm build:css --global
pnpm build:js --global

# Zbuduj tylko standalone pliki (bez globalnego)
pnpm build:css --standalone
pnpm build:js --standalone
```

### Konfiguracja bundli

Edytuj `scripts/bundle-config.ts` aby zarządzać tym, które pliki są bundlowane globalnie, a które jako standalone:

```typescript
// scripts/bundle-config.ts
export const cssConfig: BundleConfig = {
  // Pliki bundlowane do dist/styles.css (kolejność zachowana)
  global: [
    'fonts.css',
    'variables.css',
    'typography.css',
    // ...
  ],
  // Pliki budowane osobno (np. dist/players.css)
  standalone: ['players.css'],
  globalOutput: 'styles.css',
}

export const jsConfig: BundleConfig = {
  global: [], // Puste = brak globalnego bundla JS
  standalone: [
    'audio-player.ts', // → dist/audio-player.js
    'video-player.ts', // → dist/video-player.js
  ],
  globalOutput: 'scripts.js',
}
```

### Output

Po `pnpm build:assets`:

```
dist/
├── styles.css         # Globalny CSS bundle
├── players.css        # Standalone CSS
├── audio-player.js    # Standalone JS
├── video-player.js    # Standalone JS
```

## Eksport do innych projektów

Aby użyć CSS/JS w innym projekcie:

1. Zbuduj assety: `pnpm build:assets`
2. Skopiuj pliki z `dist/`:
   - `styles.css` - globalny CSS bundle
   - `players.css` - style playerów (opcjonalne, jeśli używasz playerów)
   - `audio-player.js` / `video-player.js` - skrypty playerów
3. Dodaj Phosphor Icons CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
/>
```

### Użycie playerów

Playery wymagają biblioteki [Plyr](https://plyr.io/) załadowanej przed skryptami.

```html
<!-- 1. Plyr CSS -->
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />

<!-- 2. Style playerów -->
<link rel="stylesheet" href="path/to/players.css" />

<!-- 3. Plyr JS (wymagane przed skryptami playerów) -->
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<!-- 4. Skrypty playerów -->
<script src="%VITE_STORAGE_URL%/api/public-files/alias/audio-player.js"></script>
<script src="%VITE_STORAGE_URL%/api/public-files/alias/video-player.js"></script>

<!-- 5. Inicjalizacja -->
<script>
  audioPlayer.initAudioPlayers()
  videoPlayer.initVideoPlayers()
</script>
```

#### Audio player

```html
<div class="c-audio-player" data-audio-player>
  <audio src="audio.mp3" preload="metadata"></audio>
</div>
```

#### Video player

```html
<!-- Podstawowy -->
<div class="c-video-player" data-video-player>
  <video poster="poster.jpg" preload="metadata">
    <source src="video.mp4" type="video/mp4" />
  </video>
</div>

<!-- Z tytułem -->
<div class="c-video-player" data-video-player data-title="Tytuł video">
  <video poster="poster.jpg" preload="metadata">
    <source src="video.mp4" type="video/mp4" />
  </video>
</div>
```

#### API

```javascript
// Inicjalizacja wszystkich playerów w dokumencie
audioPlayer.initAudioPlayers()
videoPlayer.initVideoPlayers()

// Inicjalizacja w konkretnym kontenerze
audioPlayer.initAudioPlayers(document.querySelector('.my-container'))

// Zniszczenie playerów (cleanup)
audioPlayer.destroyAudioPlayers()
videoPlayer.destroyVideoPlayers()
```

## Technologie

- Vue 3 + TypeScript
- Vite
- Phosphor Icons (CDN)
