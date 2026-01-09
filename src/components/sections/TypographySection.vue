<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="typografia" title="Typografia">
    <DocsSubsection id="typo-display" title="Display">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<p class='t-2xl'>Wielki tekst (Display 2xl)</p>
<p class='t-xl'>Bardzo duzy tekst (Display xl)</p>
<p class='t-lg'>Duzy tekst wyswietlania (Display lg)</p>
<p class='t-md'>Sredni tekst wyswietlania (Display md)</p>`"
      >
        <div class="typography-stack">
          <p class="t-2xl">Wielki tekst (Display 2xl)</p>
          <p class="t-xl">Bardzo duzy tekst (Display xl)</p>
          <p class="t-lg">Duzy tekst wyswietlania (Display lg)</p>
          <p class="t-md">Sredni tekst wyswietlania (Display md)</p>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="typo-headings" title="Headings">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<h1 class='t-h1'>Naglowek pierwszego poziomu (Heading h1)</h1>
<h2 class='t-h2'>Naglowek drugiego poziomu (Heading h2)</h2>
<h3 class='t-h3'>Naglowek trzeciego poziomu (Heading h3)</h3>`"
      >
        <div class="typography-stack">
          <h1 class="t-h1">Naglowek pierwszego poziomu (Heading h1)</h1>
          <h2 class="t-h2">Naglowek drugiego poziomu (Heading h2)</h2>
          <h3 class="t-h3">Naglowek trzeciego poziomu (Heading h3)</h3>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="typo-body" title="Body">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<p class='t-body-l'>Wiekszy tekst tresci dla waznych informacji (Body L)</p>
<p class='t-body-m'>Standardowy tekst tresci uzywany w paragrafach (Body M)</p>
<p class='t-body-s'>Mniejszy tekst dla mniej istotnych informacji (Body S)</p>`"
      >
        <div class="typography-stack">
          <p class="t-body-l">Wiekszy tekst tresci dla waznych informacji (Body L)</p>
          <p class="t-body-m">Standardowy tekst tresci uzywany w paragrafach (Body M)</p>
          <p class="t-body-s">Mniejszy tekst dla mniej istotnych informacji (Body S)</p>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="typo-small" title="Small">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<p class='t-caption'>Podpisy i drobne adnotacje (Caption)</p>
<p class='t-label'>ETYKIETY I TAGI (Label)</p>`"
      >
        <div class="typography-stack">
          <p class="t-caption">Podpisy i drobne adnotacje (Caption)</p>
          <p class="t-label">ETYKIETY I TAGI (Label)</p>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection
      id="typo-weights"
      title="Grubosci (Font Weights)"
      description="Klasy pomocnicze do zmiany grubosci czcionki. Lacza sie z dowolna klasa rozmiaru tekstu, np. <code>.t-body-l</code> + <code>.t-font-bold</code>."
    >
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<p class='t-body-l t-font-regular'>Regular (400)</p>
<p class='t-body-l t-font-medium'>Medium (500)</p>
<p class='t-body-l t-font-semibold'>Semibold (600)</p>
<p class='t-body-l t-font-bold'>Bold (700)</p>`"
      >
        <div class="typography-stack">
          <p class="t-body-l t-font-regular">Regular (400)</p>
          <p class="t-body-l t-font-medium">Medium (500)</p>
          <p class="t-body-l t-font-semibold">Semibold (600)</p>
          <p class="t-body-l t-font-bold">Bold (700)</p>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>

<style scoped>
.typography-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.typography-stack > * {
  margin: 0;
}
</style>
