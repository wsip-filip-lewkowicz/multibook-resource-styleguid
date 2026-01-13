/**
 * Bundle Configuration
 *
 * Manages which CSS and JS files are bundled globally vs standalone.
 *
 * - `global`: Files bundled together into a single output file (order preserved)
 * - `standalone`: Files built as separate output files
 * - Files not listed in either array are ignored
 */

export interface BundleConfig {
  /** Files bundled into single output (order preserved) */
  global: string[]
  /** Files built as separate outputs */
  standalone: string[]
  /** Output filename for global bundle */
  globalOutput: string
}

/**
 * CSS Bundle Configuration
 *
 * Source: src/styles/
 * Output: dist/
 */
export const cssConfig: BundleConfig = {
  global: [
    'fonts.css',
    'variables.css',
    'typography.css',
    'buttons.css',
    'inputs.css',
    'checkboxes.css',
    'radios.css',
    'switches.css',
    'featured-icons.css',
  ],
  standalone: ['players.css'],
  globalOutput: 'styles-[hash].css',
}

/**
 * JS Bundle Configuration
 *
 * Source: src/scripts/
 * Output: dist/
 */
export const jsConfig: BundleConfig = {
  global: [],
  standalone: ['audio-player.ts', 'video-player.ts'],
  globalOutput: 'scripts-[hash].js',
}
