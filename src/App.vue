<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import 'vue-sonner/style.css'
import { Toaster, toast } from 'vue-sonner'
import { useCSSVariables } from './composables/useCSSVariables'
import { initAllSelects } from './composables/useSelect'
import { initAllMultiselects } from './composables/useMultiselect'
import { navItems } from './constants/navigation'
import AppSidebar from './components/AppSidebar.vue'

// Section components
import VariablesSection from './components/sections/VariablesSection.vue'
import TypographySection from './components/sections/TypographySection.vue'
import ButtonsSection from './components/sections/ButtonsSection.vue'
import InputsSection from './components/sections/InputsSection.vue'
import PlayersSection from './components/sections/PlayersSection.vue'
import IconsSection from './components/sections/IconsSection.vue'
import FeaturedIconsSection from './components/sections/FeaturedIconsSection.vue'
import HeadersSection from './components/sections/HeadersSection.vue'
import SdkSection from './components/sections/SdkSection.vue'
import SwitchesSection from './components/sections/SwitchesSection.vue'
import CheckboxesSection from './components/sections/CheckboxesSection.vue'
import RadioSection from './components/sections/RadioSection.vue'

const { parsedVars, handleCopyVariable } = useCSSVariables()

function handleCopy(text: string) {
  toast.success(`Skopiowano: ${text}`)
}

function handleCopyHtml() {
  toast.success('Skopiowano kod HTML')
}

// Active section tracking
const activeSection = ref(navItems[0]?.id ?? '')
let observer: IntersectionObserver | null = null
const selectCleanups: Array<() => void> = []

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

  navItems.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })

  // Initialize select/multiselect components using composables
  selectCleanups.push(...initAllSelects())
  selectCleanups.push(...initAllMultiselects())
})

onUnmounted(() => {
  observer?.disconnect()
  selectCleanups.forEach((cleanup) => cleanup())
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">Styleguide</h1>
    </header>

    <AppSidebar :active-section />

    <main>
      <VariablesSection :parsed-vars @copy="handleCopy" @copy-variable="handleCopyVariable" />
      <TypographySection @copy-html="handleCopyHtml" />
      <ButtonsSection @copy-html="handleCopyHtml" />
      <InputsSection @copy-html="handleCopyHtml" />
      <PlayersSection @copy-html="handleCopyHtml" />
      <IconsSection @copy-html="handleCopyHtml" />
      <FeaturedIconsSection @copy-html="handleCopyHtml" />
      <HeadersSection @copy-html="handleCopyHtml" />
      <SdkSection @copy-html="handleCopyHtml" />
      <SwitchesSection @copy-html="handleCopyHtml" />
      <CheckboxesSection @copy-html="handleCopyHtml" />
      <RadioSection @copy-html="handleCopyHtml" />
    </main>

    <Toaster position="bottom-right" :duration="2000" />
  </div>
</template>
