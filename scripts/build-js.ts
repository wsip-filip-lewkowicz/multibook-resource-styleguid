/**
 * JS Build Script
 *
 * Builds JS/TS files according to bundle-config.ts:
 * - Global files → dist/scripts.js (bundled)
 * - Standalone files → dist/{filename}.js (individual)
 *
 * Usage:
 *   pnpm build:js              # Build all (global + standalone)
 *   pnpm build:js --global     # Build only global bundle
 *   pnpm build:js --standalone # Build only standalone files
 */

import { build } from 'vite'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { jsConfig } from './bundle-config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC_SCRIPTS = resolve(ROOT, 'src/scripts')
const DIST = resolve(ROOT, 'dist')

// Parse CLI flags
const args = process.argv.slice(2)
const buildGlobal = args.length === 0 || args.includes('--global')
const buildStandalone = args.length === 0 || args.includes('--standalone')

/**
 * Generate index.ts content from global files
 */
function generateIndexTs(): string {
  if (jsConfig.global.length === 0) {
    return '// No global scripts configured\nexport {}\n'
  }

  const exports = jsConfig.global.map((file) => {
    const name = basename(file, '.ts')
    return `export * from './${name}.js'`
  })
  return exports.join('\n') + '\n'
}

/**
 * Build global JS bundle
 */
async function buildGlobalBundle(): Promise<void> {
  if (jsConfig.global.length === 0) {
    console.log('ℹ No global JS files configured, skipping global bundle')
    return
  }

  console.log(`\n📦 Building global JS bundle → dist/${jsConfig.globalOutput}`)
  console.log(`   Files: ${jsConfig.global.join(', ')}`)

  // Generate temporary index.ts for bundling
  const indexContent = generateIndexTs()
  const indexPath = resolve(SRC_SCRIPTS, '_index.ts')
  writeFileSync(indexPath, indexContent)

  try {
    await build({
      root: ROOT,
      logLevel: 'warn',
      build: {
        emptyOutDir: false,
        minify: true,
        lib: {
          entry: indexPath,
          name: 'MultibookScripts',
          fileName: () => jsConfig.globalOutput.replace('.js', ''),
          formats: ['iife'],
        },
        rollupOptions: {
          external: ['plyr'],
          output: {
            globals: {
              plyr: 'Plyr',
            },
            entryFileNames: jsConfig.globalOutput,
          },
        },
      },
    })
    console.log(`   ✓ dist/${jsConfig.globalOutput}`)
  } finally {
    // Clean up temp file
    const { unlinkSync } = await import('node:fs')
    try {
      unlinkSync(indexPath)
    } catch {
      // ignore
    }
  }
}

/**
 * Build standalone JS files
 */
async function buildStandaloneFiles(): Promise<void> {
  if (jsConfig.standalone.length === 0) {
    console.log('ℹ No standalone JS files configured')
    return
  }

  console.log(`\n📦 Building standalone JS files`)

  // Ensure dist exists
  if (!existsSync(DIST)) {
    mkdirSync(DIST, { recursive: true })
  }

  for (const file of jsConfig.standalone) {
    const inputPath = resolve(SRC_SCRIPTS, file)
    const outputName = basename(file, '.ts')

    console.log(`   Building ${file} → dist/${outputName}.js`)

    await build({
      root: ROOT,
      logLevel: 'warn',
      build: {
        emptyOutDir: false,
        minify: true,
        lib: {
          entry: inputPath,
          name: outputName
            .split('-')
            .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
            .join(''), // kebab-to-camelCase
          fileName: () => outputName,
          formats: ['iife'],
        },
        rollupOptions: {
          external: ['plyr'],
          output: {
            globals: {
              plyr: 'Plyr',
            },
            entryFileNames: `${outputName}.js`,
          },
        },
      },
    })

    console.log(`   ✓ dist/${outputName}.js`)
  }
}

/**
 * Main build function
 */
async function main(): Promise<void> {
  console.log('📜 JS Build')

  if (buildGlobal) {
    await buildGlobalBundle()
  }

  if (buildStandalone) {
    await buildStandaloneFiles()
  }

  console.log('\n✅ JS build complete\n')
}

main().catch((err) => {
  console.error('❌ JS build failed:', err)
  process.exit(1)
})
