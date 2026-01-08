<script setup lang="ts">
defineProps<{
  id?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="docs-subsection">
    <h3 v-if="id" :id="id" class="docs-subsection-title">
      <a :href="'#' + id" class="docs-subsection-anchor">#</a>
      {{ title }}
    </h3>
    <h3 v-else class="docs-subsection-title">{{ title }}</h3>
    <p v-if="description" class="docs-subsection-description" v-html="description"></p>
    <slot />
  </div>
</template>

<style scoped>
.docs-subsection {
  margin-bottom: 2rem;
}

.docs-subsection-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  scroll-margin-top: 2rem;
}

.docs-subsection-description {
  font-size: 0.9375rem;
  color: var(--color-gray-500);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.docs-subsection-description :deep(code) {
  background: var(--color-gray-100);
  color: var(--color-error-600);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.docs-subsection-anchor {
  color: var(--color-gray-300);
  text-decoration: none;
  font-weight: 400;
}

.docs-subsection-anchor:hover {
  color: var(--color-brand-600);
}
</style>
