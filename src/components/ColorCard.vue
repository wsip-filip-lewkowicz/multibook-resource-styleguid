<script setup lang="ts">
const props = defineProps<{
  name: string
  variable: string
  value: string
}>()

const emit = defineEmits<{
  copy: [text: string]
}>()

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

function handleClick() {
  const text = `var(${props.variable})`
  navigator.clipboard.writeText(text)
  emit('copy', text)
}
</script>

<template>
  <div class="color-card" @click="handleClick">
    <div class="color-swatch" :style="{ backgroundColor: value }">
      <span class="color-swatch-label" :class="{ 'light-text': !isLightColor(value) }">
        {{ value }}
      </span>
    </div>
    <div class="color-info">
      <div class="color-name">{{ name }}</div>
      <div class="color-variable">{{ variable }}</div>
    </div>
  </div>
</template>
