import { resolve } from 'node:path'
import { existsSync, readdirSync, unlinkSync } from 'node:fs'

export const ROOT = resolve(import.meta.dirname, '..')

export interface BuildFlags {
  buildGlobal: boolean
  buildStandalone: boolean
}

export function parseBuildFlags(argv: string[]): BuildFlags {
  const args = argv.slice(2)
  const buildAll = args.length === 0

  return {
    buildGlobal: buildAll || args.includes('--global'),
    buildStandalone: buildAll || args.includes('--standalone'),
  }
}

function cleanupDistFiles(
  dist: string,
  options: {
    cleanGlobal: boolean
    cleanStandalone: boolean
    globalPattern?: RegExp
    standaloneFiles?: string[]
  },
): void {
  if (!existsSync(dist)) {
    return
  }

  const files = readdirSync(dist)

  if (options.cleanGlobal && options.globalPattern) {
    files.forEach((file) => {
      if (options.globalPattern!.test(file)) {
        removeDistFile(resolve(dist, file), file)
      }
    })
  }

  if (options.cleanStandalone && options.standaloneFiles) {
    options.standaloneFiles.forEach((file) => {
      const filePath = resolve(dist, file)
      if (existsSync(filePath)) {
        removeDistFile(filePath, file)
      }
    })
  }
}

function removeDistFile(filePath: string, label: string): void {
  try {
    unlinkSync(filePath)
    console.log(`   🗑️  Removed old file: ${label}`)
  } catch (err) {
    console.warn(`   ⚠️  Failed to remove ${label}:`, err)
  }
}

export function createDistCleanup(
  dist: string,
  options: {
    globalPattern: RegExp
    standaloneFiles: string[]
  },
): (cleanGlobal: boolean, cleanStandalone: boolean) => void {
  return (cleanGlobal, cleanStandalone) => {
    cleanupDistFiles(dist, {
      cleanGlobal,
      cleanStandalone,
      globalPattern: options.globalPattern,
      standaloneFiles: options.standaloneFiles,
    })
  }
}

export async function runBuildScript(
  label: string,
  completeLabel: string,
  flags: BuildFlags,
  tasks: {
    global?: () => Promise<void>
    standalone?: () => Promise<void>
  },
): Promise<void> {
  console.log(label)

  if (flags.buildGlobal && tasks.global) {
    await tasks.global()
  }

  if (flags.buildStandalone && tasks.standalone) {
    await tasks.standalone()
  }

  console.log(`\n✅ ${completeLabel}\n`)
}
