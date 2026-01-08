<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ColorCard from './components/ColorCard.vue'
import DocsExample from './components/DocsExample.vue'
import DocsSection from './components/DocsSection.vue'
import DocsSubsection from './components/DocsSubsection.vue'

const toastMessage = ref('')
const showToast = ref(false)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

function showToastMessage(message: string) {
  // Anuluj poprzedni timeout żeby uniknąć race condition
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }
  toastMessage.value = message
  showToast.value = true
  toastTimeout = setTimeout(() => {
    showToast.value = false
    toastTimeout = null
  }, 2000)
}

function handleCopy(text: string) {
  showToastMessage(`Skopiowano: ${text}`)
}

function handleCopyHtml() {
  showToastMessage('Skopiowano kod HTML')
}

// Color groups
const colorGroups = [
  {
    name: 'Brand',
    colors: [
      { name: 'Brand 25', variable: '--color-brand-25', value: '#e6eff9' },
      { name: 'Brand 50', variable: '--color-brand-50', value: '#ccdef2' },
      { name: 'Brand 100', variable: '--color-brand-100', value: '#b3ceec' },
      { name: 'Brand 200', variable: '--color-brand-200', value: '#99bde5' },
      { name: 'Brand 300', variable: '--color-brand-300', value: '#7facde' },
      { name: 'Brand 400', variable: '--color-brand-400', value: '#669cd8' },
      { name: 'Brand 500', variable: '--color-brand-500', value: '#4d8cd2' },
      { name: 'Brand 600', variable: '--color-brand-600', value: '#337bcb' },
      { name: 'Brand 700', variable: '--color-brand-700', value: '#005abe' },
      { name: 'Brand 800', variable: '--color-brand-800', value: '#004898' },
      { name: 'Brand 900', variable: '--color-brand-900', value: '#003672' },
      { name: 'Brand 950', variable: '--color-brand-950', value: '#04162a' },
    ],
  },
  {
    name: 'Gray',
    colors: [
      { name: 'Gray 25', variable: '--color-gray-25', value: '#fcfcfd' },
      { name: 'Gray 50', variable: '--color-gray-50', value: '#f8fafc' },
      { name: 'Gray 100', variable: '--color-gray-100', value: '#f3f5f7' },
      { name: 'Gray 200', variable: '--color-gray-200', value: '#e7eaed' },
      { name: 'Gray 300', variable: '--color-gray-300', value: '#cad6e5' },
      { name: 'Gray 400', variable: '--color-gray-400', value: '#9ba8b7' },
      { name: 'Gray 500', variable: '--color-gray-500', value: '#65778c' },
      { name: 'Gray 600', variable: '--color-gray-600', value: '#495564' },
      { name: 'Gray 700', variable: '--color-gray-700', value: '#3d4855' },
      { name: 'Gray 800', variable: '--color-gray-800', value: '#272d35' },
      { name: 'Gray 900', variable: '--color-gray-900', value: '#1a1f25' },
    ],
  },
  {
    name: 'Gray Blue',
    colors: [
      { name: 'Gray Blue 10', variable: '--color-gray-blue-10', value: '#fbfcfd' },
      { name: 'Gray Blue 25', variable: '--color-gray-blue-25', value: '#f4f7fa' },
      { name: 'Gray Blue 50', variable: '--color-gray-blue-50', value: '#e7ecf4' },
      { name: 'Gray Blue 100', variable: '--color-gray-blue-100', value: '#d2dceb' },
      { name: 'Gray Blue 200', variable: '--color-gray-blue-200', value: '#b3c5dd' },
      { name: 'Gray Blue 300', variable: '--color-gray-blue-300', value: '#8fa7cb' },
      { name: 'Gray Blue 400', variable: '--color-gray-blue-400', value: '#748dbd' },
      { name: 'Gray Blue 500', variable: '--color-gray-blue-500', value: '#6176af' },
      { name: 'Gray Blue 600', variable: '--color-gray-blue-600', value: '#56669f' },
      { name: 'Gray Blue 700', variable: '--color-gray-blue-700', value: '#4a5483' },
      { name: 'Gray Blue 800', variable: '--color-gray-blue-800', value: '#3f4869' },
      { name: 'Gray Blue 900', variable: '--color-gray-blue-900', value: '#2a2e41' },
    ],
  },
  {
    name: 'Success',
    colors: [
      { name: 'Success 25', variable: '--color-success-25', value: '#f6fef9' },
      { name: 'Success 50', variable: '--color-success-50', value: '#ecfdf3' },
      { name: 'Success 100', variable: '--color-success-100', value: '#d1fadf' },
      { name: 'Success 200', variable: '--color-success-200', value: '#a6f4c5' },
      { name: 'Success 300', variable: '--color-success-300', value: '#6ce9a6' },
      { name: 'Success 400', variable: '--color-success-400', value: '#32d583' },
      { name: 'Success 500', variable: '--color-success-500', value: '#12b76a' },
      { name: 'Success 600', variable: '--color-success-600', value: '#039855' },
      { name: 'Success 700', variable: '--color-success-700', value: '#027a48' },
      { name: 'Success 800', variable: '--color-success-800', value: '#05603a' },
      { name: 'Success 900', variable: '--color-success-900', value: '#054f31' },
    ],
  },
  {
    name: 'Error',
    colors: [
      { name: 'Error 25', variable: '--color-error-25', value: '#fffbfa' },
      { name: 'Error 50', variable: '--color-error-50', value: '#fef3f2' },
      { name: 'Error 100', variable: '--color-error-100', value: '#fee4e2' },
      { name: 'Error 200', variable: '--color-error-200', value: '#fecdca' },
      { name: 'Error 300', variable: '--color-error-300', value: '#fda29b' },
      { name: 'Error 400', variable: '--color-error-400', value: '#f97066' },
      { name: 'Error 500', variable: '--color-error-500', value: '#f04438' },
      { name: 'Error 600', variable: '--color-error-600', value: '#d92d20' },
      { name: 'Error 700', variable: '--color-error-700', value: '#b42318' },
      { name: 'Error 800', variable: '--color-error-800', value: '#912018' },
      { name: 'Error 900', variable: '--color-error-900', value: '#7a271a' },
    ],
  },
  {
    name: 'Warning',
    colors: [
      { name: 'Warning 25', variable: '--color-warning-25', value: '#fffcf5' },
      { name: 'Warning 50', variable: '--color-warning-50', value: '#fffaeb' },
      { name: 'Warning 100', variable: '--color-warning-100', value: '#fef0c7' },
      { name: 'Warning 200', variable: '--color-warning-200', value: '#fedf89' },
      { name: 'Warning 300', variable: '--color-warning-300', value: '#fec84b' },
      { name: 'Warning 400', variable: '--color-warning-400', value: '#fdb022' },
      { name: 'Warning 500', variable: '--color-warning-500', value: '#f79009' },
      { name: 'Warning 600', variable: '--color-warning-600', value: '#dc6803' },
      { name: 'Warning 700', variable: '--color-warning-700', value: '#b54708' },
      { name: 'Warning 800', variable: '--color-warning-800', value: '#93370d' },
      { name: 'Warning 900', variable: '--color-warning-900', value: '#7a2e0e' },
    ],
  },
  {
    name: 'Blue (Info)',
    colors: [
      { name: 'Blue 25', variable: '--color-blue-25', value: '#f1f9fe' },
      { name: 'Blue 50', variable: '--color-blue-50', value: '#e2f2fc' },
      { name: 'Blue 100', variable: '--color-blue-100', value: '#bfe4f8' },
      { name: 'Blue 200', variable: '--color-blue-200', value: '#73c8f0' },
      { name: 'Blue 300', variable: '--color-blue-300', value: '#47b7e9' },
      { name: 'Blue 400', variable: '--color-blue-400', value: '#1fa0d8' },
      { name: 'Blue 500', variable: '--color-blue-500', value: '#117fb8' },
      { name: 'Blue 600', variable: '--color-blue-600', value: '#0f6595' },
      { name: 'Blue 800', variable: '--color-blue-800', value: '#144866' },
      { name: 'Blue 900', variable: '--color-blue-900', value: '#0d2e44' },
    ],
  },
]

const activeColorGroup = ref('Brand')

// Active section tracking
const activeSection = ref('kolory')
const sectionIds = ['kolory', 'typografia', 'przyciski', 'checkboxy', 'switche', 'radio']
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    },
  )

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">Styleguide</h1>
    </header>

    <aside class="sidebar">
      <nav class="sidebar-nav">
        <a href="#kolory" class="sidebar-link" :class="{ active: activeSection === 'kolory' }"
          >Kolory</a
        >
        <a
          href="#typografia"
          class="sidebar-link"
          :class="{ active: activeSection === 'typografia' }"
          >Typografia</a
        >
        <a href="#przyciski" class="sidebar-link" :class="{ active: activeSection === 'przyciski' }"
          >Przyciski</a
        >
        <a href="#checkboxy" class="sidebar-link" :class="{ active: activeSection === 'checkboxy' }"
          >Checkboxy</a
        >
        <a href="#switche" class="sidebar-link" :class="{ active: activeSection === 'switche' }"
          >Switche</a
        >
        <a href="#radio" class="sidebar-link" :class="{ active: activeSection === 'radio' }"
          >Radio Buttons</a
        >
      </nav>
    </aside>

    <main>
      <!-- COLORS -->
      <DocsSection id="kolory" title="Kolory">
        <div class="color-tabs">
          <button
            v-for="group in colorGroups"
            :key="group.name"
            class="color-tab"
            :class="{ active: activeColorGroup === group.name }"
            @click="activeColorGroup = group.name"
          >
            {{ group.name }}
          </button>
        </div>

        <div class="color-grid">
          <template v-for="group in colorGroups" :key="group.name">
            <template v-if="activeColorGroup === group.name">
              <ColorCard
                v-for="color in group.colors"
                :key="color.variable"
                :name="color.name"
                :variable="color.variable"
                :value="color.value"
                @copy="handleCopy"
              />
            </template>
          </template>
        </div>
      </DocsSection>

      <!-- TYPOGRAPHY -->
      <DocsSection id="typografia" title="Typografia">
        <DocsSubsection id="typo-display" title="Display">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<p class='t-2xl'>Wielki tekst</p>
<p class='t-xl'>Bardzo duzy tekst</p>
<p class='t-lg'>Duzy tekst wyswietlania</p>
<p class='t-md'>Sredni tekst wyswietlania</p>`"
          >
            <div class="typography-stack">
              <p class="t-2xl">Wielki tekst</p>
              <p class="t-xl">Bardzo duzy tekst</p>
              <p class="t-lg">Duzy tekst wyswietlania</p>
              <p class="t-md">Sredni tekst wyswietlania</p>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="typo-headings" title="Headings">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<h1 class='t-h1'>Naglowek pierwszego poziomu</h1>
<h2 class='t-h2'>Naglowek drugiego poziomu</h2>
<h3 class='t-h3'>Naglowek trzeciego poziomu</h3>`"
          >
            <div class="typography-stack">
              <h1 class="t-h1">Naglowek pierwszego poziomu</h1>
              <h2 class="t-h2">Naglowek drugiego poziomu</h2>
              <h3 class="t-h3">Naglowek trzeciego poziomu</h3>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="typo-body" title="Body">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<p class='t-body-l'>Wiekszy tekst tresci dla waznych informacji</p>
<p class='t-body-m'>Standardowy tekst tresci uzywany w paragrafach</p>
<p class='t-body-s'>Mniejszy tekst dla mniej istotnych informacji</p>`"
          >
            <div class="typography-stack">
              <p class="t-body-l">Wiekszy tekst tresci dla waznych informacji</p>
              <p class="t-body-m">Standardowy tekst tresci uzywany w paragrafach</p>
              <p class="t-body-s">Mniejszy tekst dla mniej istotnych informacji</p>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="typo-small" title="Small">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<p class='t-caption'>Podpisy i drobne adnotacje</p>
<p class='t-label'>ETYKIETY I TAGI</p>`"
          >
            <div class="typography-stack">
              <p class="t-caption">Podpisy i drobne adnotacje</p>
              <p class="t-label">ETYKIETY I TAGI</p>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection
          id="typo-weights"
          title="Grubosci (Font Weights)"
          description="Klasy pomocnicze do zmiany grubosci czcionki. Lacza sie z dowolna klasa rozmiaru tekstu, np. <code>.t-body-l</code> + <code>.t-font-bold</code>."
        >
          <DocsExample
            @copy="handleCopyHtml"
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

      <!-- BUTTONS -->
      <DocsSection id="przyciski" title="Przyciski">
        <DocsSubsection id="btn-variants" title="Warianty kolorow">
          <DocsExample
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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

      <!-- CHECKBOXES -->
      <DocsSection id="checkboxy" title="Checkboxy">
        <DocsSubsection id="checkbox-sizes" title="Rozmiary">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<input type='checkbox' class='c-checkbox c-checkbox-sm' />
<input type='checkbox' class='c-checkbox c-checkbox-lg' />`"
          >
            <input type="checkbox" class="c-checkbox c-checkbox-sm" />
            <input type="checkbox" class="c-checkbox c-checkbox-lg" />
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="checkbox-states" title="Stany">
          <DocsExample
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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

      <!-- SWITCHES -->
      <DocsSection id="switche" title="Switche">
        <DocsSubsection id="switch-states" title="Stany">
          <DocsExample
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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

      <!-- RADIO BUTTONS -->
      <DocsSection id="radio" title="Radio Buttons">
        <DocsSubsection id="radio-sizes" title="Rozmiary">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<input type='radio' class='c-radio c-radio-sm' name='size-demo' />
<input type='radio' class='c-radio c-radio-lg' name='size-demo' />`"
          >
            <input type="radio" class="c-radio c-radio-sm" name="size-demo" />
            <input type="radio" class="c-radio c-radio-lg" name="size-demo" />
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="radio-states" title="Stany">
          <DocsExample
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
    </main>

    <Transition name="toast">
      <div v-if="showToast" class="toast">
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
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
