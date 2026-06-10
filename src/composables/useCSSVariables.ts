import { toast } from 'vue-sonner'
import variablesCss from '../styles/variables.css?raw'

export interface CssVariable {
  name: string
  value: string
}

export interface VariableGroup {
  name: string
  variables: CssVariable[]
}

export interface ParsedVariables {
  colorGroups: VariableGroup[]
  shadows: CssVariable[]
  focusRings: CssVariable[]
  radius: CssVariable[]
  typography: CssVariable[]
  opacityColors: CssVariable[]
}

const COLOR_PREFIXES = [
  { prefix: 'brand', name: 'Brand' },
  { prefix: 'gray-blue', name: 'Gray Blue' },
  { prefix: 'gray', name: 'Gray' },
  { prefix: 'success', name: 'Success' },
  { prefix: 'error', name: 'Error' },
  { prefix: 'warning', name: 'Warning' },
  { prefix: 'blue', name: 'Blue (Info)' },
  { prefix: 'white', name: 'Base' },
  { prefix: 'black', name: 'Base' },
] as const

const COLOR_GROUP_ORDER = [
  'Brand',
  'Gray',
  'Gray Blue',
  'Success',
  'Error',
  'Warning',
  'Blue (Info)',
  'Base',
] as const

function createColorMaps(): Map<string, CssVariable[]> {
  const colorMaps = new Map<string, CssVariable[]>()
  COLOR_PREFIXES.forEach(({ name }) => {
    if (!colorMaps.has(name)) colorMaps.set(name, [])
  })
  return colorMaps
}

function categorizeColorVariable(
  colorPart: string,
  variable: CssVariable,
  colorMaps: Map<string, CssVariable[]>,
  opacityColors: CssVariable[],
): void {
  if (colorPart.includes('-') && /\d/.test(colorPart.split('-').pop() || '')) {
    const found = COLOR_PREFIXES.find(({ prefix }) => colorPart.startsWith(prefix))
    if (found) {
      colorMaps.get(found.name)?.push(variable)
    }
    return
  }

  if (colorPart === 'white' || colorPart === 'black') {
    colorMaps.get('Base')?.push(variable)
    return
  }

  if (colorPart.includes('-75') || colorPart.includes('-50')) {
    opacityColors.push(variable)
  }
}

function categorizeVariable(
  varName: string,
  variable: CssVariable,
  buckets: {
    colorMaps: Map<string, CssVariable[]>
    shadows: CssVariable[]
    focusRings: CssVariable[]
    radius: CssVariable[]
    typography: CssVariable[]
    opacityColors: CssVariable[]
  },
): void {
  if (varName.startsWith('color-')) {
    categorizeColorVariable(varName.slice(6), variable, buckets.colorMaps, buckets.opacityColors)
    return
  }

  if (varName.startsWith('shadow-focus')) {
    buckets.focusRings.push(variable)
    return
  }

  if (varName.startsWith('shadow')) {
    buckets.shadows.push(variable)
    return
  }

  if (varName.startsWith('radius')) {
    buckets.radius.push(variable)
    return
  }

  if (
    varName.startsWith('font') ||
    varName.startsWith('line-height') ||
    varName.startsWith('letter-spacing')
  ) {
    buckets.typography.push(variable)
  }
}

function buildColorGroups(colorMaps: Map<string, CssVariable[]>): VariableGroup[] {
  const colorGroups: VariableGroup[] = []

  colorMaps.forEach((variables, name) => {
    if (variables.length > 0) {
      colorGroups.push({ name, variables })
    }
  })

  colorGroups.sort(
    (a, b) => COLOR_GROUP_ORDER.indexOf(a.name as (typeof COLOR_GROUP_ORDER)[number]) -
      COLOR_GROUP_ORDER.indexOf(b.name as (typeof COLOR_GROUP_ORDER)[number]),
  )

  return colorGroups
}

function parseVariables(cssText: string): ParsedVariables {
  const colorMaps = createColorMaps()
  const shadows: CssVariable[] = []
  const focusRings: CssVariable[] = []
  const radius: CssVariable[] = []
  const typography: CssVariable[] = []
  const opacityColors: CssVariable[] = []

  const varRegex = /--([\w-]+):\s*([^;]+);/g
  let match

  while ((match = varRegex.exec(cssText)) !== null) {
    const varName = match[1]
    const varValue = match[2]
    if (!varName || !varValue) continue

    categorizeVariable(varName, { name: `--${varName}`, value: varValue.trim() }, {
      colorMaps,
      shadows,
      focusRings,
      radius,
      typography,
      opacityColors,
    })
  }

  return {
    colorGroups: buildColorGroups(colorMaps),
    shadows,
    focusRings,
    radius,
    typography,
    opacityColors,
  }
}

export function useCSSVariables() {
  const parsedVars = parseVariables(variablesCss)

  function handleCopyVariable(varName: string) {
    navigator.clipboard.writeText(`var(${varName})`)
    toast.success(`Skopiowano: var(${varName})`)
  }

  return {
    parsedVars,
    handleCopyVariable,
  }
}
