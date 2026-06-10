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
import { resolve, basename } from 'node:path'
import { writeFileSync, unlinkSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { cssConfig } from './bundle-config.js'
import {
  ROOT,
  createDistCleanup,
  parseBuildFlags,
  runBuildScript,
} from './build-shared.js'

const SRC_STYLES = resolve(ROOT, 'src/styles')
const DIST = resolve(ROOT, 'dist')
const flags = parseBuildFlags(process.argv)
const cleanupOldFiles = createDistCleanup(DIST, {
  globalPattern: /^styles-[A-Za-z0-9]+\.css$/,
  standaloneFiles: cssConfig.standalone.map((file) => `${basename(file, '.css')}.css`),
})

function generateBundleCss(): string {
  const imports = cssConfig.global.map((file) => `@import './${file}';`)
  return imports.join('\n') + '\n'
}

async function buildGlobalBundle(): Promise<void> {
  if (cssConfig.global.length === 0) {
    console.log('ℹ No global CSS files configured, skipping global bundle')
    return
  }

  const hasHash = cssConfig.globalOutput.includes('[hash]')

  console.log(`\n📦 Building global CSS bundle`)
  console.log(`   Files: ${cssConfig.global.join(', ')}`)

  cleanupOldFiles(true, false)

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

    logGlobalBundleOutput(hasHash)
  } finally {
    try {
      unlinkSync(tempBundlePath)
    } catch {
      // ignore
    }
  }
}

function logGlobalBundleOutput(hasHash: boolean): void {
  if (hasHash && existsSync(DIST)) {
    const regex = new RegExp('^' + cssConfig.globalOutput.replace('[hash]', '[A-Za-z0-9]+') + '$')
    const files = readdirSync(DIST).filter((f) => regex.test(f))
    if (files.length > 0) {
      console.log(`   ✓ dist/${files[files.length - 1]}`)
      return
    }
  }

  console.log(`   ✓ dist/${cssConfig.globalOutput}`)
}

async function buildStandaloneFiles(): Promise<void> {
  if (cssConfig.standalone.length === 0) {
    console.log('ℹ No standalone CSS files configured')
    return
  }

  console.log(`\n📦 Building standalone CSS files`)

  cleanupOldFiles(false, true)

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

runBuildScript('🎨 CSS Build', 'CSS build complete', flags, {
  global: buildGlobalBundle,
  standalone: buildStandaloneFiles,
}).catch((err) => {
  console.error('❌ CSS build failed:', err)
  process.exit(1)
})
