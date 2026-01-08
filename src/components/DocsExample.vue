<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-atom-dark.css'

const props = withDefaults(
  defineProps<{
    code: string
    codeCollapsed?: boolean
  }>(),
  {
    codeCollapsed: false,
  },
)

const emit = defineEmits<{
  copy: [text: string]
}>()

const showCode = ref(!props.codeCollapsed)

function toggleCode() {
  showCode.value = !showCode.value
}

function copyCode() {
  const formattedCode = formatCode(props.code)
  navigator.clipboard.writeText(formattedCode)
  emit('copy', formattedCode)
}

function formatCode(code: string): string {
  // Format HTML with proper indentation
  let formatted = ''
  let indent = 0
  const lines = code
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  for (const line of lines) {
    // Check if line starts with closing tag
    if (line.match(/^<\//)) {
      indent = Math.max(0, indent - 1)
    }

    formatted += '  '.repeat(indent) + line + '\n'

    // Check if line has opening tag (not self-closing, not closing)
    if (line.match(/^<[a-z]/) && !line.match(/\/>$/) && !line.match(/<\/[^>]+>$/)) {
      indent++
    }
    // If line has both opening and closing on same line, don't change indent
    if (line.match(/^<[a-z]/) && line.match(/<\/[^>]+>$/)) {
      // no change
    }
  }

  return formatted.trim()
}

const highlightedCode = computed(() => {
  const formatted = formatCode(props.code)
  return Prism.highlight(formatted, Prism.languages.markup!, 'markup')
})
</script>

<template>
  <div class="docs-example">
    <div class="docs-example-preview">
      <slot />
    </div>
    <div class="docs-example-toolbar">
      <button
        class="docs-example-btn"
        type="button"
        :title="showCode ? 'Ukryj kod' : 'Pokaż kod'"
        :class="{ 'is-active': showCode }"
        @click="toggleCode"
      >
        <i class="ph ph-code"></i>
      </button>
      <button class="docs-example-btn" type="button" title="Kopiuj kod HTML" @click="copyCode">
        <i class="ph ph-clipboard"></i>
      </button>
    </div>
    <Transition name="code-slide">
      <div v-show="showCode" class="docs-example-code">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre class="language-markup"><code v-html="highlightedCode"></code></pre>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.docs-example {
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  background: white;
  overflow: hidden;
  margin-bottom: 1rem;
}

.docs-example-preview {
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  background: white;
}

.docs-example-toolbar {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--color-gray-200);
  background: var(--color-gray-50);
}

.docs-example-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-gray-500);
  cursor: pointer;
  transition: all 0.15s;
}

.docs-example-btn:hover {
  color: var(--color-gray-700);
  background: var(--color-gray-100);
}

.docs-example-btn.is-active {
  color: var(--color-gray-900);
  background: var(--color-gray-100);
}

.docs-example-code {
  border-top: 1px solid var(--color-gray-200);
  overflow-x: auto;
}

.docs-example-code pre {
  margin: 0;
  padding: 1rem 1.25rem;
  border-radius: 0;
}

.docs-example-code pre code {
  font-family:
    'Fira Code', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
}

/* Transition */
.code-slide-enter-active,
.code-slide-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.code-slide-enter-from,
.code-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.code-slide-enter-to,
.code-slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
