<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="ikony" title="Ikony">
    <p class="section-intro">
      Projekt uzywa biblioteki <a href="https://phosphoricons.com/" target="_blank" rel="noopener">Phosphor Icons</a>.
      Pelna lista ikon dostepna na stronie projektu.
      <a href="https://github.com/phosphor-icons/web" target="_blank" rel="noopener">Dokumentacja</a>.
    </p>

    <DocsSubsection
      id="ikony-uzycie"
      title="Podstawowe uzycie"
      description="Ikony dodajemy uzywajac tagu <code>&lt;i&gt;</code> z klasa wagi i nazwy ikony."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<i class='ph ph-house'></i>
<i class='ph ph-gear'></i>
<i class='ph ph-user'></i>
<i class='ph ph-magnifying-glass'></i>
<i class='ph ph-bell'></i>`"
      >
        <div class="icons-row">
          <i class="ph ph-house"></i>
          <i class="ph ph-gear"></i>
          <i class="ph ph-user"></i>
          <i class="ph ph-magnifying-glass"></i>
          <i class="ph ph-bell"></i>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="ikony-wagi"
      title="Wagi ikon"
      description="Phosphor oferuje 6 wag: <code>ph</code> (regular), <code>ph-thin</code>, <code>ph-light</code>, <code>ph-bold</code>, <code>ph-fill</code>, <code>ph-duotone</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<i class='ph-thin ph-heart'></i>
<i class='ph-light ph-heart'></i>
<i class='ph ph-heart'></i>
<i class='ph-bold ph-heart'></i>
<i class='ph-fill ph-heart'></i>
<i class='ph-duotone ph-heart'></i>`"
      >
        <div class="icons-row icons-row--large">
          <div class="icon-demo">
            <i class="ph-thin ph-heart"></i>
            <span class="icon-label">thin</span>
          </div>
          <div class="icon-demo">
            <i class="ph-light ph-heart"></i>
            <span class="icon-label">light</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-heart"></i>
            <span class="icon-label">regular</span>
          </div>
          <div class="icon-demo">
            <i class="ph-bold ph-heart"></i>
            <span class="icon-label">bold</span>
          </div>
          <div class="icon-demo">
            <i class="ph-fill ph-heart"></i>
            <span class="icon-label">fill</span>
          </div>
          <div class="icon-demo">
            <i class="ph-duotone ph-heart"></i>
            <span class="icon-label">duotone</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="ikony-rozmiary"
      title="Rozmiary"
      description="Rozmiar ikony kontrolujemy przez <code>font-size</code> w CSS."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<i class='ph ph-star' style='font-size: 16px'></i>
<i class='ph ph-star' style='font-size: 24px'></i>
<i class='ph ph-star' style='font-size: 32px'></i>
<i class='ph ph-star' style='font-size: 48px'></i>`"
      >
        <div class="icons-row">
          <div class="icon-demo">
            <i class="ph ph-star" style="font-size: 16px"></i>
            <span class="icon-label">16px</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-star" style="font-size: 24px"></i>
            <span class="icon-label">24px</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-star" style="font-size: 32px"></i>
            <span class="icon-label">32px</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-star" style="font-size: 48px"></i>
            <span class="icon-label">48px</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="ikony-kolory"
      title="Kolory"
      description="Kolor ikony kontrolujemy przez <code>color</code> w CSS."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<i class='ph ph-check-circle' style='color: var(--color-success-500)'></i>
<i class='ph ph-warning' style='color: var(--color-warning-500)'></i>
<i class='ph ph-x-circle' style='color: var(--color-error-500)'></i>
<i class='ph ph-info' style='color: var(--color-brand-700)'></i>`"
      >
        <div class="icons-row icons-row--large">
          <div class="icon-demo">
            <i class="ph ph-check-circle" style="color: var(--color-success-500)"></i>
            <span class="icon-label">success</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-warning" style="color: var(--color-warning-500)"></i>
            <span class="icon-label">warning</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-x-circle" style="color: var(--color-error-500)"></i>
            <span class="icon-label">error</span>
          </div>
          <div class="icon-demo">
            <i class="ph ph-info" style="color: var(--color-brand-700)"></i>
            <span class="icon-label">brand</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>

<style scoped>
.section-intro {
  margin-bottom: 1.5rem;
  color: var(--color-gray-600);
}

.section-intro a {
  color: var(--color-brand-700);
}

.icons-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.icons-row--large {
  font-size: 2rem;
}

.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon-label {
  font-size: 0.75rem;
  color: var(--color-gray-500);
}
</style>
