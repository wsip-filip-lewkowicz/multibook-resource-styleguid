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

function parseVariables(cssText: string): ParsedVariables {
  const colorGroups: VariableGroup[] = []
  const shadows: CssVariable[] = []
  const focusRings: CssVariable[] = []
  const radius: CssVariable[] = []
  const typography: CssVariable[] = []
  const opacityColors: CssVariable[] = []

  const colorPrefixes = [
    { prefix: 'brand', name: 'Brand' },
    { prefix: 'gray-blue', name: 'Gray Blue' },
    { prefix: 'gray', name: 'Gray' },
    { prefix: 'success', name: 'Success' },
    { prefix: 'error', name: 'Error' },
    { prefix: 'warning', name: 'Warning' },
    { prefix: 'blue', name: 'Blue (Info)' },
    { prefix: 'white', name: 'Base' },
    { prefix: 'black', name: 'Base' },
  ]

  const colorMaps = new Map<string, CssVariable[]>()
  colorPrefixes.forEach(({ name }) => {
    if (!colorMaps.has(name)) colorMaps.set(name, [])
  })

  const varRegex = /--([\w-]+):\s*([^;]+);/g
  let match

  while ((match = varRegex.exec(cssText)) !== null) {
    const varName = match[1]
    const varValue = match[2]
    if (!varName || !varValue) continue

    const variable: CssVariable = { name: `--${varName}`, value: varValue.trim() }

    if (varName.startsWith('color-')) {
      const colorPart = varName.slice(6)

      if (colorPart.includes('-') && /\d/.test(colorPart.split('-').pop() || '')) {
        const found = colorPrefixes.find(({ prefix }) => colorPart.startsWith(prefix))
        if (found) {
          const arr = colorMaps.get(found.name)
          if (arr) arr.push(variable)
        }
      } else if (colorPart === 'white' || colorPart === 'black') {
        const arr = colorMaps.get('Base')
        if (arr) arr.push(variable)
      } else if (colorPart.includes('-75') || colorPart.includes('-50')) {
        opacityColors.push(variable)
      }
    } else if (varName.startsWith('shadow-focus')) {
      focusRings.push(variable)
    } else if (varName.startsWith('shadow')) {
      shadows.push(variable)
    } else if (varName.startsWith('radius')) {
      radius.push(variable)
    } else if (varName.startsWith('font') || varName.startsWith('line-height') || varName.startsWith('letter-spacing')) {
      typography.push(variable)
    }
  }

  colorMaps.forEach((variables, name) => {
    if (variables.length > 0) {
      colorGroups.push({ name, variables })
    }
  })

  const colorGroupOrder = ['Brand', 'Gray', 'Gray Blue', 'Success', 'Error', 'Warning', 'Blue (Info)', 'Base']
  colorGroups.sort((a, b) => colorGroupOrder.indexOf(a.name) - colorGroupOrder.indexOf(b.name))

  return { colorGroups, shadows, focusRings, radius, typography, opacityColors }
}

export function useCSSVariables(showToastMessage: (message: string) => void) {
  const parsedVars = parseVariables(variablesCss)

  function handleCopyVariable(varName: string) {
    navigator.clipboard.writeText(`var(${varName})`)
    showToastMessage(`Skopiowano: var(${varName})`)
  }

  return {
    parsedVars,
    handleCopyVariable,
  }
}
