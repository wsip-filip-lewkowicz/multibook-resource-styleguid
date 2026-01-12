/**
 * CSS Build Script
 *
 * Builds CSS files according to bundle-config.ts:
 * - Global files → dist/styles.css (concatenated)
 * - Standalone files → dist/{filename}.css (individual)
 *
 * Usage:
 *   pnpm build:css              # Build all (global + standalone)
 *   pnpm build:css --global     # Build only global bundle
 *   pnpm build:css --standalone # Build only standalone files
 */

import { build } from 'vite'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { cssConfig } from './bundle-config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC_STYLES = resolve(ROOT, 'src/styles')
const DIST = resolve(ROOT, 'dist')

// Parse CLI flags
const args = process.argv.slice(2)
const buildGlobal = args.length === 0 || args.includes('--global')
const buildStandalone = args.length === 0 || args.includes('--standalone')

/**
 * Generate index.css content from global files
 */
function generateIndexCss(): string {
  const imports = cssConfig.global.map((file) => `@import './${file}';`)
  return imports.join('\n') + '\n'
}

/**
 * Build global CSS bundle
 */
async function buildGlobalBundle(): Promise<void> {
  if (cssConfig.global.length === 0) {
    console.log('ℹ No global CSS files configured, skipping global bundle')
    return
  }

  console.log(`\n📦 Building global CSS bundle → dist/${cssConfig.globalOutput}`)
  console.log(`   Files: ${cssConfig.global.join(', ')}`)

  // Generate index.css
  const indexContent = generateIndexCss()
  const indexPath = resolve(SRC_STYLES, 'index.css')
  writeFileSync(indexPath, indexContent)

  await build({
    root: ROOT,
    logLevel: 'warn',
    build: {
      emptyOutDir: false,
      cssMinify: true,
      rollupOptions: {
        input: indexPath,
        output: {
          assetFileNames: () => cssConfig.globalOutput,
        },
      },
    },
  })

  console.log(`   ✓ dist/${cssConfig.globalOutput}`)
}

/**
 * Build standalone CSS files
 */
async function buildStandaloneFiles(): Promise<void> {
  if (cssConfig.standalone.length === 0) {
    console.log('ℹ No standalone CSS files configured')
    return
  }

  console.log(`\n📦 Building standalone CSS files`)

  // Ensure dist exists
  if (!existsSync(DIST)) {
    mkdirSync(DIST, { recursive: true })
  }

  for (const file of cssConfig.standalone) {
    const inputPath = resolve(SRC_STYLES, file)
    const outputName = basename(file, '.css') + '.css'

    console.log(`   Building ${file} → dist/${outputName}`)

    await build({
      root: ROOT,
      logLevel: 'warn',
      build: {
        emptyOutDir: false,
        cssMinify: true,
        rollupOptions: {
          input: inputPath,
          output: {
            assetFileNames: () => outputName,
          },
        },
      },
    })

    console.log(`   ✓ dist/${outputName}`)
  }
}

/**
 * Main build function
 */
async function main(): Promise<void> {
  console.log('🎨 CSS Build')

  if (buildGlobal) {
    await buildGlobalBundle()
  }

  if (buildStandalone) {
    await buildStandaloneFiles()
  }

  console.log('\n✅ CSS build complete\n')
}

main().catch((err) => {
  console.error('❌ CSS build failed:', err)
  process.exit(1)
})
