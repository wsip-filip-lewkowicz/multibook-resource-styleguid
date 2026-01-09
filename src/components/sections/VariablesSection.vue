<script setup lang="ts">
import { ref } from 'vue'
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import ColorCard from '../ColorCard.vue'
import type { ParsedVariables } from '../../composables/useCSSVariables'

const { parsedVars } = defineProps<{
  parsedVars: ParsedVariables
}>()

const emit = defineEmits<{
  copy: [text: string]
  copyVariable: [varName: string]
}>()

const activeColorGroup = ref('Brand')
</script>

<template>
  <DocsSection id="zmienne" title="Zmienne">
    <!-- Kolory -->
    <DocsSubsection id="zmienne-kolory" title="Kolory">
      <div class="color-tabs">
        <button
          v-for="group in parsedVars.colorGroups"
          :key="group.name"
          class="color-tab"
          :class="{ active: activeColorGroup === group.name }"
          @click="activeColorGroup = group.name"
        >
          {{ group.name }}
        </button>
      </div>

      <div class="color-grid">
        <template v-for="group in parsedVars.colorGroups" :key="group.name">
          <template v-if="activeColorGroup === group.name">
            <ColorCard
              v-for="color in group.variables"
              :key="color.name"
              :name="color.name.replace('--color-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())"
              :variable="color.name"
              :value="color.value"
              @copy="emit('copy', $event)"
            />
          </template>
        </template>
      </div>
    </DocsSubsection>

    <!-- Cienie -->
    <DocsSubsection id="zmienne-cienie" title="Cienie">
      <div class="variables-grid">
        <div
          v-for="shadow in parsedVars.shadows"
          :key="shadow.name"
          class="variable-card variable-card--shadow variable-card--clickable"
          @click="emit('copyVariable', shadow.name)"
        >
          <div class="variable-preview" :style="{ boxShadow: shadow.value }"></div>
          <div class="variable-info">
            <span class="variable-name">{{ shadow.name }}</span>
            <code class="variable-value">{{ shadow.value }}</code>
          </div>
        </div>
      </div>
    </DocsSubsection>

    <!-- Focus Rings -->
    <DocsSubsection id="zmienne-focus" title="Focus Rings">
      <div class="variables-grid">
        <div
          v-for="ring in parsedVars.focusRings"
          :key="ring.name"
          class="variable-card variable-card--shadow variable-card--clickable"
          @click="emit('copyVariable', ring.name)"
        >
          <div class="variable-preview" :style="{ boxShadow: ring.value }"></div>
          <div class="variable-info">
            <span class="variable-name">{{ ring.name }}</span>
            <code class="variable-value">{{ ring.value }}</code>
          </div>
        </div>
      </div>
    </DocsSubsection>

    <!-- Zaokraglenia -->
    <DocsSubsection id="zmienne-radius" title="Zaokraglenia">
      <div class="variables-grid">
        <div
          v-for="r in parsedVars.radius"
          :key="r.name"
          class="variable-card variable-card--radius variable-card--clickable"
          @click="emit('copyVariable', r.name)"
        >
          <div class="variable-preview" :style="{ borderRadius: r.value }"></div>
          <div class="variable-info">
            <span class="variable-name">{{ r.name }}</span>
            <code class="variable-value">{{ r.value }}</code>
          </div>
        </div>
      </div>
    </DocsSubsection>

    <!-- Typografia -->
    <DocsSubsection id="zmienne-typografia" title="Typografia">
      <div class="variables-list">
        <div
          v-for="t in parsedVars.typography"
          :key="t.name"
          class="variable-row variable-card--clickable"
          @click="emit('copyVariable', t.name)"
        >
          <span class="variable-name">{{ t.name }}</span>
          <code class="variable-value">{{ t.value }}</code>
        </div>
      </div>
    </DocsSubsection>

    <!-- Kolory z opacity -->
    <DocsSubsection v-if="parsedVars.opacityColors.length > 0" id="zmienne-opacity" title="Kolory z opacity">
      <div class="variables-list">
        <div
          v-for="c in parsedVars.opacityColors"
          :key="c.name"
          class="variable-row variable-card--clickable"
          @click="emit('copyVariable', c.name)"
        >
          <span class="variable-color-swatch" :style="{ backgroundColor: c.value }"></span>
          <span class="variable-name">{{ c.name }}</span>
          <code class="variable-value">{{ c.value }}</code>
        </div>
      </div>
    </DocsSubsection>
  </DocsSection>
</template>

<style scoped>
.color-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.color-tab {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-gray-200);
  background: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
}

.color-tab:hover {
  background: var(--color-gray-50);
}

.color-tab.active {
  background: var(--color-brand-700);
  color: white;
  border-color: var(--color-brand-700);
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.variables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.variable-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
}

.variable-card--shadow .variable-preview {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.variable-card--radius .variable-preview {
  width: 60px;
  height: 60px;
  background: var(--color-brand-100);
  border: 2px solid var(--color-brand-500);
  flex-shrink: 0;
}

.variable-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.variable-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-900);
  word-break: break-all;
}

.variable-value {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  background: var(--color-gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  word-break: break-all;
}

.variables-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.variable-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
}

.variable-row .variable-name {
  flex: 1;
}

.variable-row .variable-value {
  flex-shrink: 0;
}

.variable-color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 0.25rem;
  border: 1px solid var(--color-gray-200);
  flex-shrink: 0;
}

.variable-card--clickable {
  cursor: pointer;
  transition: all 0.15s;
}

.variable-card--clickable:hover {
  border-color: var(--color-brand-300);
  background: var(--color-brand-25);
}
</style>
