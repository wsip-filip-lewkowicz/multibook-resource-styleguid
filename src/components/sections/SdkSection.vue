<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="sdk" title="Atrybuty SDK">
    <DocsSubsection
      id="sdk-page"
      title="Nawigacja do strony"
      description="Dodaj atrybut <code>data-page</code> z numerem strony, aby przycisk nawigował do odpowiedniej strony w PDF."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-primary' data-page='5'>
  Idz do strony 5
</button>

<button class='c-btn c-btn-md c-btn-primary-outline' data-page='10'>
  Strona 10
</button>`"
      >
        <button class="c-btn c-btn-md c-btn-primary" data-page="5">Idz do strony 5</button>
        <button class="c-btn c-btn-md c-btn-primary-outline" data-page="10">Strona 10</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="sdk-modal-close"
      title="Zamkniecie modala"
      description="Dodaj atrybut <code>data-modal-close</code>, aby przycisk zamykal modal w aplikacji nadrzednej."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<button class='c-btn c-btn-md c-btn-icon c-btn-tertiary-ghost' data-modal-close>
  <i class='ph-bold ph-x'></i>
</button>

<button class='c-btn c-btn-md c-btn-secondary-outline' data-modal-close>
  Zamknij
</button>`"
      >
        <button class="c-btn c-btn-md c-btn-icon c-btn-tertiary-ghost" data-modal-close>
          <i class="ph-bold ph-x"></i>
        </button>
        <button class="c-btn c-btn-md c-btn-secondary-outline" data-modal-close>Zamknij</button>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="sdk-keyboard"
      title="Obsluga klawiatury ekranowej"
      description="Mozesz zarzadzac klawiatura ekranowa poprzez emitowanie eventow do aplikacji nadrzednej oraz nasluchiwanie na nacisniecia klawiszy."
    >
      <div class="docs-code">
        <pre><code>import { sdk } from '@/sdk'

// Sterowanie klawiatura
sdk.emit('keyboardOpen', {})   // Otworz klawiature ekranowa
sdk.emit('keyboardClose', {})  // Zamknij klawiature ekranowa

// Nasluchiwanie na nacisniecia klawiszy
sdk.on('keyboardPressed', ({ key }) => {
  console.log('Nacisnieto klawisz:', key)
})</code></pre>
      </div>
    </DocsSubsection>

    <div class="docs-info">
      <p><strong>Podsumowanie eventow:</strong></p>
      <p class="docs-info-subtitle">iframe → parent:</p>
      <ul>
        <li><code>data-page="N"</code> - emituje <code>goToPage</code> z numerem strony</li>
        <li><code>data-modal-close</code> - emituje <code>closeModal</code></li>
        <li><code>keyboardOpen</code> - zadanie otwarcia klawiatury ekranowej</li>
        <li><code>keyboardClose</code> - zadanie zamkniecia klawiatury ekranowej</li>
      </ul>
      <p class="docs-info-subtitle">parent → iframe:</p>
      <ul>
        <li><code>keyboardPressed</code> - { key: string } - klawisz z klawiatury ekranowej</li>
      </ul>
    </div>
  </DocsSection>
</template>

<style scoped>
.docs-code {
  background: var(--color-gray-900);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.docs-code pre {
  margin: 0;
}

.docs-code code {
  color: var(--color-gray-100);
  font-size: 0.8125rem;
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
  line-height: 1.6;
}

.docs-info {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-gray-700);
}

.docs-info p {
  margin-bottom: 0.5rem;
}

.docs-info-subtitle {
  margin-top: 0.75rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.docs-info ul {
  margin: 0;
  padding-left: 1.25rem;
}

.docs-info li {
  margin-bottom: 0.25rem;
}

.docs-info code {
  background: var(--color-gray-100);
  color: var(--color-error-600);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
}
</style>
