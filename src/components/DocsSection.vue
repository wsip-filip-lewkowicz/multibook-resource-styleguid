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

.docs-section-anchor {
  color: var(--color-gray-300);
  text-decoration: none;
  font-weight: 400;
}

.docs-section-anchor:hover {
  color: var(--color-brand-600);
}
</style>
