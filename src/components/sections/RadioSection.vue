<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="radio" title="Radio Buttons">
    <DocsSubsection id="radio-sizes" title="Rozmiary">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='radio' class='c-radio c-radio-sm' name='size-demo' />
<input type='radio' class='c-radio c-radio-lg' name='size-demo' />`"
      >
        <input type="radio" class="c-radio c-radio-sm" name="size-demo" />
        <input type="radio" class="c-radio c-radio-lg" name="size-demo" />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="radio-states" title="Stany">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='radio' class='c-radio c-radio-sm' name='state-demo-1' />
<input type='radio' class='c-radio c-radio-sm' name='state-demo-2' checked />
<input type='radio' class='c-radio c-radio-sm' name='state-demo-3' disabled />
<input type='radio' class='c-radio c-radio-sm' name='state-demo-4' checked disabled />`"
      >
        <input type="radio" class="c-radio c-radio-sm" name="state-demo-1" />
        <input type="radio" class="c-radio c-radio-sm" name="state-demo-2" checked />
        <input type="radio" class="c-radio c-radio-sm" name="state-demo-3" disabled />
        <input type="radio" class="c-radio c-radio-sm" name="state-demo-4" checked disabled />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="radio-destructive" title="Destructive">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='radio' class='c-radio c-radio-sm c-radio-destructive' name='destructive-demo-1' />
<input type='radio' class='c-radio c-radio-sm c-radio-destructive' name='destructive-demo-2' checked />`"
      >
        <input
          type="radio"
          class="c-radio c-radio-sm c-radio-destructive"
          name="destructive-demo-1"
        />
        <input
          type="radio"
          class="c-radio c-radio-sm c-radio-destructive"
          name="destructive-demo-2"
          checked
        />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="radio-label"
      title="Z etykieta"
      description="Uzyj struktury <code>.c-radio-field</code> z <code>.c-radio-text</code>, <code>.c-radio-label</code> i opcjonalnie <code>.c-radio-description</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<label class='c-radio-field'>
  <input type='radio' class='c-radio c-radio-lg' name='field-demo' />
  <span class='c-radio-text'>
    <span class='c-radio-label'>Zapamietaj mnie</span>
    <span class='c-radio-description'>Zapisz dane logowania na przyszlosc.</span>
  </span>
</label>`"
      >
        <label class="c-radio-field">
          <input type="radio" class="c-radio c-radio-lg" name="field-demo" />
          <span class="c-radio-text">
            <span class="c-radio-label">Zapamietaj mnie</span>
            <span class="c-radio-description">Zapisz dane logowania na przyszlosc.</span>
          </span>
        </label>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="radio-group"
      title="Grupa Radio"
      description="Opakuj wiele <code>.c-radio-field</code> w kontener <code>.c-radio-group</code>. Pamietaj o wspolnym atrybucie <code>name</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-radio-group'>
  <label class='c-radio-field'>
    <input type='radio' class='c-radio c-radio-lg' name='role-demo' checked />
    <span class='c-radio-text'>
      <span class='c-radio-label'>Dyrektor</span>
    </span>
  </label>
  <label class='c-radio-field'>
    <input type='radio' class='c-radio c-radio-lg' name='role-demo' />
    <span class='c-radio-text'>
      <span class='c-radio-label'>Nauczyciel</span>
    </span>
  </label>
  <label class='c-radio-field'>
    <input type='radio' class='c-radio c-radio-lg' name='role-demo' />
    <span class='c-radio-text'>
      <span class='c-radio-label'>Uczen</span>
    </span>
  </label>
</div>`"
      >
        <div class="c-radio-group">
          <label class="c-radio-field">
            <input type="radio" class="c-radio c-radio-lg" name="role-demo" checked />
            <span class="c-radio-text">
              <span class="c-radio-label">Dyrektor</span>
            </span>
          </label>
          <label class="c-radio-field">
            <input type="radio" class="c-radio c-radio-lg" name="role-demo" />
            <span class="c-radio-text">
              <span class="c-radio-label">Nauczyciel</span>
            </span>
          </label>
          <label class="c-radio-field">
            <input type="radio" class="c-radio c-radio-lg" name="role-demo" />
            <span class="c-radio-text">
              <span class="c-radio-label">Uczen</span>
            </span>
          </label>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
