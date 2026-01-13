/**
 * CSS Build Script
 *
 * Builds CSS files according to bundle-config.ts:
 * - Global files → dist/styles-[hash].css (concatenated with content hash)
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
import { writeFileSync, unlinkSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
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
 * Generate temporary bundle CSS content from global files
 */
function generateBundleCss(): string {
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

  const hasHash = cssConfig.globalOutput.includes('[hash]')

  console.log(`\n📦 Building global CSS bundle`)
  console.log(`   Files: ${cssConfig.global.join(', ')}`)

  // Generate temporary bundle file (don't overwrite src/styles/index.css)
  const bundleContent = generateBundleCss()
  const tempBundlePath = resolve(SRC_STYLES, '_bundle.css')
  writeFileSync(tempBundlePath, bundleContent)

  try {
    await build({
      root: ROOT,
      logLevel: 'warn',
      build: {
        emptyOutDir: false,
        cssMinify: true,
        rollupOptions: {
          input: tempBundlePath,
          output: {
            assetFileNames: cssConfig.globalOutput,
          },
        },
      },
    })

    // Find the actual generated filename
    if (hasHash && existsSync(DIST)) {
      const regex = new RegExp('^' + cssConfig.globalOutput.replace('[hash]', '[A-Za-z0-9]+') + '$')
      const files = readdirSync(DIST).filter((f) => regex.test(f))
      if (files.length > 0) {
        console.log(`   ✓ dist/${files[files.length - 1]}`)
      } else {
        console.log(`   ✓ dist/${cssConfig.globalOutput}`)
      }
    } else {
      console.log(`   ✓ dist/${cssConfig.globalOutput}`)
    }
  } finally {
    // Clean up temp file
    try {
      unlinkSync(tempBundlePath)
    } catch {
      // ignore
    }
  }
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
