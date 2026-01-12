<script setup lang="ts">
defineProps<{
  id: string
  title: string
}>()
</script>

<template>
  <section :id="id" class="docs-section">
    <h2 class="docs-section-title">
      <a :href="'#' + id" class="docs-section-anchor">#</a>
      {{ title }}
    </h2>
    <div v-if="$slots.description" class="docs-section-description">
      <slot name="description" />
    </div>
    <slot />
  </section>
</template>

<style scoped>
.docs-section {
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
}

.docs-section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.docs-section-description {
  margin-bottom: 1.5rem;
  color: var(--color-gray-700);
}

.docs-section-description :deep(pre:not([class*='language-'])) {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.docs-section-description :deep(code:not([class*='language-'])) {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
}

.docs-section-description :deep(a) {
  color: var(--color-brand-700);
  text-decoration: underline;
}

.docs-section-anchor {
  color: var(--color-gray-300);
  text-decoration: none;
  font-weight: 400;
}

.docs-section-anchor:hover {
  color: var(--color-brand-600);
}
</style>
