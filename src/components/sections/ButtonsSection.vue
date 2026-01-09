<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="przyciski" title="Przyciski">
    <DocsSubsection id="btn-variants" title="Warianty kolorow">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-primary'>Primary</button>
<button class='c-btn c-btn-md c-btn-secondary'>Secondary</button>
<button class='c-btn c-btn-md c-btn-tertiary'>Tertiary</button>
<button class='c-btn c-btn-md c-btn-error'>Error</button>`"
      >
        <button class="c-btn c-btn-md c-btn-primary">Primary</button>
        <button class="c-btn c-btn-md c-btn-secondary">Secondary</button>
        <button class="c-btn c-btn-md c-btn-tertiary">Tertiary</button>
        <button class="c-btn c-btn-md c-btn-error">Error</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="btn-outline" title="Outline">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-primary-outline'>Primary</button>
<button class='c-btn c-btn-md c-btn-secondary-outline'>Secondary</button>
<button class='c-btn c-btn-md c-btn-tertiary-outline'>Tertiary</button>
<button class='c-btn c-btn-md c-btn-error-outline'>Error</button>`"
      >
        <button class="c-btn c-btn-md c-btn-primary-outline">Primary</button>
        <button class="c-btn c-btn-md c-btn-secondary-outline">Secondary</button>
        <button class="c-btn c-btn-md c-btn-tertiary-outline">Tertiary</button>
        <button class="c-btn c-btn-md c-btn-error-outline">Error</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="btn-ghost" title="Ghost">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-primary-ghost'>Primary</button>
<button class='c-btn c-btn-md c-btn-secondary-ghost'>Secondary</button>
<button class='c-btn c-btn-md c-btn-tertiary-ghost'>Tertiary</button>
<button class='c-btn c-btn-md c-btn-error-ghost'>Error</button>`"
      >
        <button class="c-btn c-btn-md c-btn-primary-ghost">Primary</button>
        <button class="c-btn c-btn-md c-btn-secondary-ghost">Secondary</button>
        <button class="c-btn c-btn-md c-btn-tertiary-ghost">Tertiary</button>
        <button class="c-btn c-btn-md c-btn-error-ghost">Error</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="btn-sizes" title="Rozmiary">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-sm c-btn-primary'>Small</button>
<button class='c-btn c-btn-md c-btn-primary'>Medium</button>
<button class='c-btn c-btn-lg c-btn-primary'>Large</button>`"
      >
        <button class="c-btn c-btn-sm c-btn-primary">Small</button>
        <button class="c-btn c-btn-md c-btn-primary">Medium</button>
        <button class="c-btn c-btn-lg c-btn-primary">Large</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="btn-icons"
      title="Z ikonami"
      description="Dodaj klase <code>.c-btn-icon-start</code>, <code>.c-btn-icon-end</code> lub <code>.c-btn-icon-both</code> w zaleznosci od pozycji ikony."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-icon-start c-btn-primary'>
  <i class='ph ph-plus'></i>Dodaj
</button>
<button class='c-btn c-btn-md c-btn-icon-end c-btn-primary'>
  Dalej<i class='ph ph-arrow-right'></i>
</button>
<button class='c-btn c-btn-md c-btn-icon-both c-btn-secondary-outline'>
  <i class='ph ph-funnel'></i>Filtruj<i class='ph ph-caret-down'></i>
</button>`"
      >
        <button class="c-btn c-btn-md c-btn-icon-start c-btn-primary">
          <i class="ph ph-plus"></i>Dodaj
        </button>
        <button class="c-btn c-btn-md c-btn-icon-end c-btn-primary">
          Dalej<i class="ph ph-arrow-right"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon-both c-btn-secondary-outline">
          <i class="ph ph-funnel"></i>Filtruj<i class="ph ph-caret-down"></i>
        </button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="btn-icon-only"
      title="Icon-only"
      description="Dla przyciskow zawierajacych tylko ikone uzyj klasy <code>.c-btn-icon</code> zamiast <code>.c-btn-icon-start</code>/<code>.c-btn-icon-end</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-sm c-btn-icon c-btn-primary'><i class='ph ph-plus'></i></button>
<button class='c-btn c-btn-md c-btn-icon c-btn-primary'><i class='ph ph-plus'></i></button>
<button class='c-btn c-btn-lg c-btn-icon c-btn-primary'><i class='ph ph-plus'></i></button>`"
      >
        <button class="c-btn c-btn-sm c-btn-icon c-btn-primary">
          <i class="ph ph-plus"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon c-btn-primary">
          <i class="ph ph-plus"></i>
        </button>
        <button class="c-btn c-btn-lg c-btn-icon c-btn-primary">
          <i class="ph ph-plus"></i>
        </button>
      </DocsExample>

      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-icon c-btn-primary'><i class='ph ph-pencil-simple'></i></button>
<button class='c-btn c-btn-md c-btn-icon c-btn-primary-outline'><i class='ph ph-pencil-simple'></i></button>
<button class='c-btn c-btn-md c-btn-icon c-btn-primary-ghost'><i class='ph ph-pencil-simple'></i></button>
<button class='c-btn c-btn-md c-btn-icon c-btn-secondary'><i class='ph ph-trash'></i></button>
<button class='c-btn c-btn-md c-btn-icon c-btn-error'><i class='ph ph-x'></i></button>`"
      >
        <button class="c-btn c-btn-md c-btn-icon c-btn-primary">
          <i class="ph ph-pencil-simple"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon c-btn-primary-outline">
          <i class="ph ph-pencil-simple"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon c-btn-primary-ghost">
          <i class="ph ph-pencil-simple"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon c-btn-secondary">
          <i class="ph ph-trash"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-icon c-btn-error"><i class="ph ph-x"></i></button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="btn-disabled"
      title="Disabled"
      description="Dodaj atrybut <code>disabled</code> do przycisku aby go wylaczac."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-primary' disabled>Primary</button>
<button class='c-btn c-btn-md c-btn-primary-outline' disabled>Outline</button>
<button class='c-btn c-btn-md c-btn-primary-ghost' disabled>Ghost</button>`"
      >
        <button class="c-btn c-btn-md c-btn-primary" disabled>Primary</button>
        <button class="c-btn c-btn-md c-btn-primary-outline" disabled>Outline</button>
        <button class="c-btn c-btn-md c-btn-primary-ghost" disabled>Ghost</button>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
