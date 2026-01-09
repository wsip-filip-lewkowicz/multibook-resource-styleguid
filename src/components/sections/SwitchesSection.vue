<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="switche" title="Switche">
    <DocsSubsection id="switch-states" title="Stany">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<input type='checkbox' class='c-switch c-switch-sm' />
<input type='checkbox' class='c-switch c-switch-sm' checked />
<input type='checkbox' class='c-switch c-switch-sm' disabled />
<input type='checkbox' class='c-switch c-switch-sm' checked disabled />`"
      >
        <input type="checkbox" class="c-switch c-switch-sm" />
        <input type="checkbox" class="c-switch c-switch-sm" checked />
        <input type="checkbox" class="c-switch c-switch-sm" disabled />
        <input type="checkbox" class="c-switch c-switch-sm" checked disabled />
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="switch-label"
      title="Z etykieta"
      description="Uzyj struktury <code>.c-switch-field</code> z <code>.c-switch-text</code>, <code>.c-switch-label</code> i opcjonalnie <code>.c-switch-description</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<label class='c-switch-field'>
  <input type='checkbox' class='c-switch c-switch-sm' />
  <span class='c-switch-text'>
    <span class='c-switch-label'>Powiadomienia</span>
    <span class='c-switch-description'>Wlacz powiadomienia o nowych alertach.</span>
  </span>
</label>`"
      >
        <label class="c-switch-field">
          <input type="checkbox" class="c-switch c-switch-sm" />
          <span class="c-switch-text">
            <span class="c-switch-label">Powiadomienia</span>
            <span class="c-switch-description">Wlacz powiadomienia o nowych alertach.</span>
          </span>
        </label>
      </DocsExample>

      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<label class='c-switch-field'>
  <input type='checkbox' class='c-switch c-switch-sm' checked />
  <span class='c-switch-text'>
    <span class='c-switch-label'>Automatyczne aktualizacje</span>
  </span>
</label>`"
      >
        <label class="c-switch-field">
          <input type="checkbox" class="c-switch c-switch-sm" checked />
          <span class="c-switch-text">
            <span class="c-switch-label">Automatyczne aktualizacje</span>
          </span>
        </label>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="switch-group"
      title="Grupa Switchy"
      description="Opakuj wiele <code>.c-switch-field</code> w kontener <code>.c-switch-group</code> dla spojnego ukladania."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-switch-group'>
  <label class='c-switch-field'>
    <input type='checkbox' class='c-switch c-switch-sm' checked />
    <span class='c-switch-text'>
      <span class='c-switch-label'>Powiadomienia email</span>
    </span>
  </label>
  <label class='c-switch-field'>
    <input type='checkbox' class='c-switch c-switch-sm' />
    <span class='c-switch-text'>
      <span class='c-switch-label'>Powiadomienia push</span>
    </span>
  </label>
  <label class='c-switch-field'>
    <input type='checkbox' class='c-switch c-switch-sm' disabled />
    <span class='c-switch-text'>
      <span class='c-switch-label'>Powiadomienia SMS</span>
    </span>
  </label>
</div>`"
      >
        <div class="c-switch-group">
          <label class="c-switch-field">
            <input type="checkbox" class="c-switch c-switch-sm" checked />
            <span class="c-switch-text">
              <span class="c-switch-label">Powiadomienia email</span>
            </span>
          </label>
          <label class="c-switch-field">
            <input type="checkbox" class="c-switch c-switch-sm" />
            <span class="c-switch-text">
              <span class="c-switch-label">Powiadomienia push</span>
            </span>
          </label>
          <label class="c-switch-field">
            <input type="checkbox" class="c-switch c-switch-sm" disabled />
            <span class="c-switch-text">
              <span class="c-switch-label">Powiadomienia SMS</span>
            </span>
          </label>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
