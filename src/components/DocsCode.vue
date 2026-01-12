<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-atom-dark.css'

const props = defineProps<{
  code: string
  language?: string
}>()

const lang = computed(() => props.language || 'markup')

const highlightedCode = computed(() => {
  const grammar = Prism.languages[lang.value]
  if (!grammar) {
    return props.code
  }
  return Prism.highlight(props.code, grammar, lang.value)
})
</script>

<template>
  <div class="docs-example-code">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <pre :class="`language-${lang}`"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<style scoped>
.docs-example-code {
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 1rem 0;
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
</style>
