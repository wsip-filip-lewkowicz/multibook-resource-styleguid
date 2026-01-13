<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="headers" title="Naglowki">
    <DocsSubsection
      id="headers-default"
      title="Domyslny"
      description="Przycisk zamykajacy musi miec atrybut <code>data-modal-close</code>, aby komunikowal sie z aplikacja nadrzedna i zamykal modal."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-header'>
  <div class='c-header-icon'>
    <div class='c-featured-icon c-featured-icon--brand c-featured-icon--l'>
      <i class='ph ph-puzzle-piece'></i>
    </div>
  </div>
  <div class='c-header-content'>
    <h2 class='c-header-title t-h2 t-font-medium'>Przyporządkuj opisy badań do nazw nauk przyrodniczych</h2>
  </div>
  <button type='button' class='c-header-close c-btn c-btn-icon c-btn-md c-btn-tertiary-ghost' data-modal-close>
    <i class='ph-bold ph-x'></i>
  </button>
</div>`"
      >
        <div class="c-header" style="background: white; border-radius: 1rem;">
          <div class="c-header-icon">
            <div class="c-featured-icon c-featured-icon--brand c-featured-icon--l">
              <i class="ph ph-puzzle-piece"></i>
            </div>
          </div>
          <div class="c-header-content">
            <h2 class="c-header-title t-h2 t-font-medium">Przyporządkuj opisy badań do nazw nauk przyrodniczych</h2>
          </div>
          <button type="button" class="c-header-close c-btn c-btn-icon c-btn-md c-btn-tertiary-ghost" data-modal-close>
            <i class="ph-bold ph-x"></i>
          </button>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
