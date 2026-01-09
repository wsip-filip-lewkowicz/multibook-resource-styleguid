# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 styleguide application that documents and showcases CSS design system components. It serves two purposes:
1. Interactive documentation for UI components (buttons, inputs, checkboxes, etc.)
2. Exportable CSS library via `build:css` command

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build with type checking
pnpm type-check   # TypeScript validation (vue-tsc --build)
pnpm lint         # ESLint with auto-fix
pnpm build:css    # Build standalone CSS bundle to dist/styles.css
```

## Architecture

### CSS Design System (`src/styles/`)

The CSS is structured as a modular design system:

- `index.css` - Import aggregator for all CSS modules
- `variables.css` - Design tokens (colors, shadows, radius, typography)
- `fonts.css` - Silka font family definitions with remote loading
- `typography.css` - Text styles and font application
- Component styles: `buttons.css`, `inputs.css`, `checkboxes.css`, `radios.css`, `switches.css`, `featured-icons.css`

CSS variables follow naming conventions:
- Colors: `--color-{palette}-{shade}` (e.g., `--color-brand-700`, `--color-gray-500`)
- Shadows: `--shadow-{size}` and `--shadow-focus-{color}`
- Radius: `--radius-{size}`

### Vue Components

- `src/App.vue` - Main application with sidebar navigation and section composition
- `src/components/sections/` - Section components for each UI category (VariablesSection, ButtonsSection, etc.)
- `src/components/` - Shared components (ColorCard, DocsExample, DocsSection, DocsSubsection)
- `src/composables/useCSSVariables.ts` - Parses CSS variables from `variables.css` for dynamic display

### Build System

- Standard Vite + Vue 3 setup
- `scripts/build-css.ts` - Separate Vite config for building standalone CSS bundle
- Path alias: `@` maps to `src/`

## Key Patterns

- Section components emit `copy-html` events for clipboard functionality
- CSS parsing composable uses `?raw` import to read CSS as string
- Polish language used for UI labels and toast messages
