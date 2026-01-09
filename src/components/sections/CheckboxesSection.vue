<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="checkboxy" title="Checkboxy">
    <DocsSubsection id="checkbox-sizes" title="Rozmiary">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='checkbox' class='c-checkbox c-checkbox-sm' />
<input type='checkbox' class='c-checkbox c-checkbox-lg' />`"
      >
        <input type="checkbox" class="c-checkbox c-checkbox-sm" />
        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="checkbox-states" title="Stany">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='checkbox' class='c-checkbox c-checkbox-sm' />
<input type='checkbox' class='c-checkbox c-checkbox-sm' checked />
<input type='checkbox' class='c-checkbox c-checkbox-sm' disabled />
<input type='checkbox' class='c-checkbox c-checkbox-sm' checked disabled />`"
      >
        <input type="checkbox" class="c-checkbox c-checkbox-sm" />
        <input type="checkbox" class="c-checkbox c-checkbox-sm" checked />
        <input type="checkbox" class="c-checkbox c-checkbox-sm" disabled />
        <input type="checkbox" class="c-checkbox c-checkbox-sm" checked disabled />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="checkbox-destructive" title="Destructive">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='checkbox' class='c-checkbox c-checkbox-sm c-checkbox-destructive' />
<input type='checkbox' class='c-checkbox c-checkbox-sm c-checkbox-destructive' checked />`"
      >
        <input type="checkbox" class="c-checkbox c-checkbox-sm c-checkbox-destructive" />
        <input
          type="checkbox"
          class="c-checkbox c-checkbox-sm c-checkbox-destructive"
          checked
        />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="checkbox-label"
      title="Z etykieta"
      description="Uzyj struktury <code>.c-checkbox-field</code> z <code>.c-checkbox-text</code>, <code>.c-checkbox-label</code> i opcjonalnie <code>.c-checkbox-description</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<label class='c-checkbox-field'>
  <input type='checkbox' class='c-checkbox c-checkbox-sm' />
  <span class='c-checkbox-text'>
    <span class='c-checkbox-label'>Zapamietaj mnie</span>
    <span class='c-checkbox-description'>Zapisz dane logowania na przyszlosc.</span>
  </span>
</label>`"
      >
        <label class="c-checkbox-field">
          <input type="checkbox" class="c-checkbox c-checkbox-sm" />
          <span class="c-checkbox-text">
            <span class="c-checkbox-label">Zapamietaj mnie</span>
            <span class="c-checkbox-description">Zapisz dane logowania na przyszlosc.</span>
          </span>
        </label>
      </DocsExample>

      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<label class='c-checkbox-field'>
  <input type='checkbox' class='c-checkbox c-checkbox-sm' checked />
  <span class='c-checkbox-text'>
    <span class='c-checkbox-label'>Akceptuje regulamin</span>
  </span>
</label>`"
      >
        <label class="c-checkbox-field">
          <input type="checkbox" class="c-checkbox c-checkbox-sm" checked />
          <span class="c-checkbox-text">
            <span class="c-checkbox-label">Akceptuje regulamin</span>
          </span>
        </label>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
