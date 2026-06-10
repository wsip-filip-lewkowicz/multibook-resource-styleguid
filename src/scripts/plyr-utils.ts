import type { Options as PlyrOptions } from 'plyr'

type UnknownRecord = Record<string, unknown>

function isPlainObject(value: unknown): value is UnknownRecord {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function mergeInto(target: UnknownRecord, source: UnknownRecord): UnknownRecord {
  Object.entries(source).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      target[key] = [...value]
      return
    }

    if (isPlainObject(value)) {
      const base = isPlainObject(target[key]) ? (target[key] as UnknownRecord) : {}
      target[key] = mergeInto({ ...base }, value)
      return
    }

    target[key] = value
  })

  return target
}

export function mergePlyrOptions(...sources: Array<Partial<PlyrOptions> | undefined>): PlyrOptions {
  return sources.reduce<UnknownRecord>((result, source) => {
    if (!source) {
      return result
    }

    return mergeInto(result, source as UnknownRecord)
  }, {}) as PlyrOptions
}

export function parseDataOptions(container: HTMLElement, scriptName: string): Partial<PlyrOptions> {
  const rawConfig = container.dataset.plyrConfig

  if (!rawConfig) {
    return {}
  }

  try {
    const parsed = JSON.parse(rawConfig)

    if (!isPlainObject(parsed)) {
      console.warn(`[${scriptName}] data-plyr-config must be a JSON object:`, container)
      return {}
    }

    return parsed as Partial<PlyrOptions>
  } catch {
    console.warn(`[${scriptName}] Invalid JSON in data-plyr-config:`, container)
    return {}
  }
}
