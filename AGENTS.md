# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the Vue 3 app and styleguide content.
- `src/components/` holds documentation UI components.
- `src/styles/` stores the CSS source files (`variables.css`, `typography.css`, `buttons.css`, `checkboxes.css`, `radios.css`) that are concatenated for distribution.
- `public/` is for static assets served by Vite.
- `dist/` is generated output; do not edit by hand.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies (Node `^20.19.0 || >=22.12.0`).
- `pnpm dev` runs the local Vite dev server.
- `pnpm build` runs type checking and the production build.
- `pnpm preview` serves the production build locally.
- `pnpm build:css` concatenates CSS sources into `dist/styles.css`.
- `pnpm lint` runs ESLint with auto-fix.
- `pnpm format` formats `src/` with Prettier.

## Coding Style & Naming Conventions
- Use TypeScript in Vue single-file components where possible.
- Follow existing CSS naming patterns: `.t-*` for typography and `.c-btn-*` for buttons.
- Keep indentation consistent with Prettier defaults (2 spaces).
- Run `pnpm lint` and `pnpm format` before submitting changes.

## Testing Guidelines
- There are no automated tests in this repo yet.
- Validate changes by running `pnpm type-check` and verifying the UI in `pnpm dev`.
- If you add tests in the future, document the framework and naming pattern here.

## Commit & Pull Request Guidelines
- Commit messages in this repo are sentence-style and descriptive (e.g., “Update package dependencies…”).
- Keep commits focused on a single change set.
- Pull requests should include a short summary, testing notes, and screenshots for UI changes.
- Link related issues or requirements when available.

## Configuration & Assets
- The styleguide depends on Phosphor Icons via CDN; keep the links in `index.html` updated when versions change.
- Avoid committing generated files under `dist/` unless explicitly required for release.
