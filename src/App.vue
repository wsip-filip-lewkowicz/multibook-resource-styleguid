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

const featuredIconSizes = [
  { name: 'XS', class: 'c-featured-icon--xs' },
  { name: 'S', class: 'c-featured-icon--s' },
  { name: 'M', class: 'c-featured-icon--m' },
  { name: 'L', class: 'c-featured-icon--l' },
  { name: 'XL', class: 'c-featured-icon--xl' },
]

const featuredIconColors = [
  { name: 'Brand', class: 'c-featured-icon--brand', icon: 'ph-lightning' },
  { name: 'Gray', class: 'c-featured-icon--gray', icon: 'ph-arrow-square-in' },
  { name: 'Error', class: 'c-featured-icon--error', icon: 'ph-warning-circle' },
  { name: 'Warning', class: 'c-featured-icon--warning', icon: 'ph-warning' },
  { name: 'Success', class: 'c-featured-icon--success', icon: 'ph-check' },
]

// Active section tracking
const activeSection = ref('kolory')
const sectionIds = [
  'kolory',
  'typografia',
  'przyciski',
  'inputy',
  'ikony',
  'featured-icons',
  'switche',
  'checkboxy',
  'radio',
]
let observer: IntersectionObserver | null = null
const selectCleanups: Array<() => void> = []

function initSelect(root: HTMLElement) {
  const trigger = root.querySelector<HTMLElement>('[data-select-trigger]')
  const dropdown = root.querySelector<HTMLElement>('[data-select-dropdown]')
  const valueEl = root.querySelector<HTMLElement>('[data-select-value]')
  const options = Array.from(root.querySelectorAll<HTMLElement>('[data-select-option]'))

  if (!trigger || !dropdown || !valueEl || options.length === 0)
    return null

  const setAriaState = (open: boolean) => {
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false')
    dropdown.setAttribute('aria-hidden', open ? 'false' : 'true')
  }

  const close = () => {
    root.classList.remove('is-open')
    setAriaState(false)
  }

  const closeOtherSelects = () => {
    document.querySelectorAll<HTMLElement>('[data-select].is-open').forEach((openSelect) => {
      if (openSelect === root)
        return
      openSelect.classList.remove('is-open')
      const otherTrigger = openSelect.querySelector<HTMLElement>('[data-select-trigger]')
      const otherDropdown = openSelect.querySelector<HTMLElement>('[data-select-dropdown]')
      otherTrigger?.setAttribute('aria-expanded', 'false')
      otherDropdown?.setAttribute('aria-hidden', 'true')
    })
  }

  const open = () => {
    closeOtherSelects()
    root.classList.add('is-open')
    setAriaState(true)
  }

  const toggle = () => {
    root.classList.contains('is-open') ? close() : open()
  }

  const onTriggerClick = (event: Event) => {
    if ((trigger as HTMLButtonElement).disabled)
      return
    event.preventDefault()
    toggle()
  }

  const onOptionClick = (event: Event) => {
    const option = event.currentTarget as HTMLElement
    options.forEach((item) => {
      item.setAttribute('aria-selected', item === option ? 'true' : 'false')
    })
    const label = option.textContent?.trim()
    if (label) {
      valueEl.textContent = label
      valueEl.setAttribute('data-placeholder', 'false')
    }
    root.setAttribute('data-value', option.dataset.value ?? '')
    close()
  }

  const onDocumentClick = (event: Event) => {
    const target = event.target as Node | null
    if (target && !root.contains(target))
      close()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape')
      close()
  }

  options.forEach(option => option.setAttribute('aria-selected', 'false'))
  setAriaState(false)

  trigger.addEventListener('click', onTriggerClick)
  options.forEach(option => option.addEventListener('click', onOptionClick))
  document.addEventListener('click', onDocumentClick)
  root.addEventListener('keydown', onKeydown)

  return () => {
    trigger.removeEventListener('click', onTriggerClick)
    options.forEach(option => option.removeEventListener('click', onOptionClick))
    document.removeEventListener('click', onDocumentClick)
    root.removeEventListener('keydown', onKeydown)
  }
}

function initMultiselect(root: HTMLElement) {
  const trigger = root.querySelector<HTMLButtonElement>('[data-multiselect-trigger]')
  const dropdown = root.querySelector<HTMLElement>('[data-multiselect-dropdown]')
  const list = root.querySelector<HTMLElement>('[data-multiselect-list]')
  const valueEl = root.querySelector<HTMLElement>('[data-multiselect-value]')
  const tagsContainer = root.querySelector<HTMLElement>('[data-multiselect-tags]')
  const options = Array.from(root.querySelectorAll<HTMLElement>('[data-multiselect-option]'))

  if (!trigger || !dropdown || !list || !valueEl || !tagsContainer || options.length === 0)
    return null

  const setAriaState = (open: boolean) => {
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false')
    dropdown.setAttribute('aria-hidden', open ? 'false' : 'true')
  }

  let highlightedIndex = -1

  const setHighlighted = (index: number) => {
    options.forEach(opt => opt.classList.remove('is-highlighted'))
    highlightedIndex = Math.max(0, Math.min(index, options.length - 1))
    const option = options[highlightedIndex]
    if (option) {
      option.classList.add('is-highlighted')
      option.scrollIntoView({ block: 'nearest' })
    }
  }

  const clearHighlight = () => {
    options.forEach(opt => opt.classList.remove('is-highlighted'))
    highlightedIndex = -1
  }

  const close = () => {
    root.classList.remove('is-open')
    setAriaState(false)
    clearHighlight()
  }

  const closeOtherSelects = () => {
    document.querySelectorAll<HTMLElement>('[data-multiselect].is-open').forEach((openSelect) => {
      if (openSelect === root)
        return
      openSelect.classList.remove('is-open')
      const otherTrigger = openSelect.querySelector<HTMLElement>('[data-multiselect-trigger]')
      const otherDropdown = openSelect.querySelector<HTMLElement>('[data-multiselect-dropdown]')
      otherTrigger?.setAttribute('aria-expanded', 'false')
      otherDropdown?.setAttribute('aria-hidden', 'true')
    })
  }

  const open = () => {
    closeOtherSelects()
    root.classList.add('is-open')
    setAriaState(true)
  }

  const toggle = () => {
    root.classList.contains('is-open') ? close() : open()
  }

  const updatePlaceholder = () => {
    const hasVisibleTags = tagsContainer.querySelector('.c-multiselect-tag:not([style*="display: none"])')
    if (!hasVisibleTags) {
      valueEl.textContent = 'Wybierz'
      valueEl.setAttribute('data-placeholder', 'true')
    }
    else {
      valueEl.textContent = ''
      valueEl.setAttribute('data-placeholder', 'false')
    }
  }

  const createTag = (label: string, value: string): HTMLElement => {
    const tag = document.createElement('span')
    tag.className = 'c-multiselect-tag'
    tag.setAttribute('data-value', value)

    const avatar = document.createElement('span')
    avatar.className = 'c-multiselect-tag-avatar'
    tag.appendChild(avatar)

    const text = document.createElement('span')
    text.className = 'c-multiselect-tag-label'
    text.textContent = label
    tag.appendChild(text)

    const remove = document.createElement('button')
    remove.type = 'button'
    remove.className = 'c-multiselect-tag-remove'
    remove.setAttribute('aria-label', `Usun ${label}`)
    remove.setAttribute('data-multiselect-tag-remove', value)
    remove.innerHTML = '<i class="ph ph-x"></i>'
    tag.appendChild(remove)

    return tag
  }

  const ICON_WIDTH = 34
  const TAG_GAP = 6
  const COUNTER_MARGIN = 40

  const renderTags = () => {
    tagsContainer.innerHTML = ''
    const selectedOptions = options.filter(opt => opt.getAttribute('aria-selected') === 'true')

    if (selectedOptions.length === 0) {
      updatePlaceholder()
      return
    }

    const tempTags: HTMLElement[] = []
    selectedOptions.forEach((option) => {
      const label = option.dataset.label || option.textContent?.trim()
      const value = option.dataset.value
      if (!label || !value)
        return

      const tag = createTag(label, value)
      tempTags.push(tag)
      tagsContainer.appendChild(tag)
    })

    const containerWidth = tagsContainer.clientWidth
    const availableWidth = containerWidth - COUNTER_MARGIN

    let currentWidth = 0
    let visibleCount = 0

    for (let i = 0; i < tempTags.length; i++) {
      const tagWidth = tempTags[i].offsetWidth + (i > 0 ? TAG_GAP : 0)
      if (currentWidth + tagWidth > availableWidth && i > 0)
        break
      currentWidth += tagWidth
      visibleCount++
    }

    if (visibleCount === tempTags.length) {
      updatePlaceholder()
      return
    }

    for (let i = visibleCount; i < tempTags.length; i++) {
      tempTags[i].style.display = 'none'
    }

    const overflowCount = tempTags.length - visibleCount
    const counter = document.createElement('span')
    counter.className = 'c-multiselect-overflow'
    counter.textContent = `+${overflowCount}`
    tagsContainer.appendChild(counter)

    updatePlaceholder()
  }

  const onTriggerClick = (event: Event) => {
    if (trigger.disabled)
      return
    event.preventDefault()
    toggle()
  }

  const onOptionClick = (event: Event) => {
    const option = event.currentTarget as HTMLElement
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    const isSelected = option.getAttribute('aria-selected') === 'true'
    option.setAttribute('aria-selected', isSelected ? 'false' : 'true')
    if (checkbox)
      checkbox.checked = !isSelected
    renderTags()
  }

  const onDocumentClick = (event: Event) => {
    const target = event.target as Node | null
    if (target && !root.contains(target))
      close()
  }

  const onKeydown = (event: KeyboardEvent) => {
    const isOpen = root.classList.contains('is-open')

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          open()
          setHighlighted(0)
        }
        else {
          setHighlighted(highlightedIndex + 1)
        }
        break

      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) {
          open()
          setHighlighted(options.length - 1)
        }
        else {
          setHighlighted(highlightedIndex - 1)
        }
        break

      case 'Enter':
      case ' ':
        if (isOpen && highlightedIndex >= 0) {
          event.preventDefault()
          const option = options[highlightedIndex]
          if (option) {
            const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
            const isSelected = option.getAttribute('aria-selected') === 'true'
            option.setAttribute('aria-selected', isSelected ? 'false' : 'true')
            if (checkbox)
              checkbox.checked = !isSelected
            renderTags()
          }
        }
        else if (!isOpen) {
          event.preventDefault()
          open()
          setHighlighted(0)
        }
        break

      case 'Home':
        if (isOpen) {
          event.preventDefault()
          setHighlighted(0)
        }
        break

      case 'End':
        if (isOpen) {
          event.preventDefault()
          setHighlighted(options.length - 1)
        }
        break

      case 'Escape':
        close()
        break

      case 'Tab':
        if (isOpen) {
          close()
        }
        break
    }
  }

  const onTagsClick = (event: Event) => {
    const target = event.target as HTMLElement | null
    const removeButton = target?.closest<HTMLElement>('[data-multiselect-tag-remove]')
    if (!removeButton)
      return
    const value = removeButton.getAttribute('data-multiselect-tag-remove')
    const option = options.find(item => item.dataset.value === value)
    if (!option)
      return
    option.setAttribute('aria-selected', 'false')
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    if (checkbox)
      checkbox.checked = false
    renderTags()
  }

  options.forEach((option) => {
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    const isSelected = option.getAttribute('aria-selected') === 'true' || checkbox?.checked
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false')
    if (checkbox)
      checkbox.checked = !!isSelected
  })
  setAriaState(false)
  renderTags()

  trigger.addEventListener('click', onTriggerClick)
  options.forEach((option, index) => {
    option.addEventListener('click', onOptionClick)
    option.addEventListener('mouseenter', () => setHighlighted(index))
  })
  tagsContainer.addEventListener('click', onTagsClick)
  document.addEventListener('click', onDocumentClick)
  root.addEventListener('keydown', onKeydown)

  const resizeObserver = new ResizeObserver(() => {
    renderTags()
  })
  resizeObserver.observe(tagsContainer)

  return () => {
    trigger.removeEventListener('click', onTriggerClick)
    options.forEach(option => option.removeEventListener('click', onOptionClick))
    tagsContainer.removeEventListener('click', onTagsClick)
    document.removeEventListener('click', onDocumentClick)
    root.removeEventListener('keydown', onKeydown)
    resizeObserver.disconnect()
  }
}

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

  document.querySelectorAll<HTMLElement>('[data-select]').forEach((root) => {
    const cleanup = initSelect(root)
    if (cleanup)
      selectCleanups.push(cleanup)
  })

  document.querySelectorAll<HTMLElement>('[data-multiselect]').forEach((root) => {
    const cleanup = initMultiselect(root)
    if (cleanup)
      selectCleanups.push(cleanup)
  })
})

onUnmounted(() => {
  observer?.disconnect()
  selectCleanups.forEach(cleanup => cleanup())
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
        <a href="#inputy" class="sidebar-link" :class="{ active: activeSection === 'inputy' }"
          >Inputy</a
        >
        <a href="#ikony" class="sidebar-link" :class="{ active: activeSection === 'ikony' }"
          >Ikony</a
        >
        <a
          href="#featured-icons"
          class="sidebar-link"
          :class="{ active: activeSection === 'featured-icons' }"
          >Ikony wyroznione</a
        >
        <a href="#switche" class="sidebar-link" :class="{ active: activeSection === 'switche' }"
          >Switche</a
        >
        <a href="#checkboxy" class="sidebar-link" :class="{ active: activeSection === 'checkboxy' }"
          >Checkboxy</a
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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

      <!-- INPUTS -->
      <DocsSection id="inputy" title="Inputy">
        <DocsSubsection id="input-default" title="Default">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' value='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <input class="c-input" type="email" placeholder="andy@wsip.com" />
                  <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                    <i class="ph ph-question c-input-icon"></i>
                  </button>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <input class="c-input" type="email" value="andy@wsip.com" />
                  <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                    <i class="ph ph-question c-input-icon"></i>
                  </button>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
            </div>
          </DocsExample>

          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' disabled />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc' disabled>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' aria-invalid='true' />
      <span class='c-input-trailing-icon'>
        <i class='ph ph-warning-circle c-input-icon'></i>
      </span>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <input class="c-input" type="email" placeholder="andy@wsip.com" disabled />
                  <button class="c-input-trailing-button" type="button" aria-label="Pomoc" disabled>
                    <i class="ph ph-question c-input-icon"></i>
                  </button>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <input class="c-input" type="email" placeholder="andy@wsip.com" aria-invalid="true" />
                  <span class="c-input-trailing-icon">
                    <i class="ph ph-warning-circle c-input-icon"></i>
                  </span>
                </div>
                <span class="c-input-hint c-input-hint--error">This is an error message.</span>
              </div>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="input-leading" title="Z ikona po lewej">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' disabled />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc' disabled>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' aria-invalid='true' />
      <span class='c-input-trailing-icon'>
        <i class='ph ph-warning-circle c-input-icon'></i>
      </span>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
                  <input class="c-input" type="email" placeholder="andy@wsip.com" />
                  <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                    <i class="ph ph-question c-input-icon"></i>
                  </button>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
                  <input class="c-input" type="email" placeholder="andy@wsip.com" disabled />
                  <button class="c-input-trailing-button" type="button" aria-label="Pomoc" disabled>
                    <i class="ph ph-question c-input-icon"></i>
                  </button>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
              <div class="c-input-field">
                <label class="c-input-label">Email</label>
                <div class="c-input-group">
                  <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
                  <input class="c-input" type="email" placeholder="andy@wsip.com" aria-invalid="true" />
                  <span class="c-input-trailing-icon">
                    <i class="ph ph-warning-circle c-input-icon"></i>
                  </span>
                </div>
                <span class="c-input-hint c-input-hint--error">This is an error message.</span>
              </div>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="input-select" title="Select">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-demo-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-demo-label'
        aria-controls='select-demo-list'
        aria-expanded='false'
        aria-haspopup='listbox'
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-demo-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='3'>0, 1, 2, 3</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='4'>0, 1, 2, 3, 4</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='5'>0, 1, 2, 3, 4, 5</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='6'>0, 1, 2, 3, 4, 5, 6</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='7'>0, 1, 2, 3, 4, 5, 6, 7</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>Single select.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label" id="select-demo-label">Przedzial</label>
                <div class="c-select" data-select>
                  <button
                    class="c-select-trigger"
                    type="button"
                    data-select-trigger
                    aria-labelledby="select-demo-label"
                    aria-controls="select-demo-list"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                  >
                    <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                    <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
                  </button>
                  <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                    <div class="c-select-dropdown-list" role="listbox" id="select-demo-list">
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="3">0, 1, 2, 3</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="4">0, 1, 2, 3, 4</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="5">0, 1, 2, 3, 4, 5</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="6">0, 1, 2, 3, 4, 5, 6</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="7">0, 1, 2, 3, 4, 5, 6, 7</button>
                    </div>
                  </div>
                </div>
                <span class="c-input-hint">Single select.</span>
              </div>
            </div>
          </DocsExample>

          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-disabled-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-disabled-label'
        aria-controls='select-disabled-list'
        aria-expanded='false'
        aria-haspopup='listbox'
        disabled
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-disabled-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>Disabled.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-error-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-error-label'
        aria-controls='select-error-list'
        aria-expanded='false'
        aria-haspopup='listbox'
        aria-invalid='true'
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-error-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label" id="select-disabled-label">Przedzial</label>
                <div class="c-select" data-select>
                  <button
                    class="c-select-trigger"
                    type="button"
                    data-select-trigger
                    aria-labelledby="select-disabled-label"
                    aria-controls="select-disabled-list"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    disabled
                  >
                    <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                    <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
                  </button>
                  <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                    <div class="c-select-dropdown-list" role="listbox" id="select-disabled-list">
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                    </div>
                  </div>
                </div>
                <span class="c-input-hint">Disabled.</span>
              </div>
              <div class="c-input-field">
                <label class="c-input-label" id="select-error-label">Przedzial</label>
                <div class="c-select" data-select>
                  <button
                    class="c-select-trigger"
                    type="button"
                    data-select-trigger
                    aria-labelledby="select-error-label"
                    aria-controls="select-error-list"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    aria-invalid="true"
                  >
                    <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                    <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
                  </button>
                  <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                    <div class="c-select-dropdown-list" role="listbox" id="select-error-list">
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                      <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                    </div>
                  </div>
                </div>
                <span class="c-input-hint c-input-hint--error">This is an error message.</span>
              </div>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="input-multiselect" title="Multi select">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='multiselect-demo-label'>Users</label>
    <div class='c-multiselect' data-multiselect>
      <button
        class='c-multiselect-trigger'
        type='button'
        data-multiselect-trigger
        aria-labelledby='multiselect-demo-label'
        aria-controls='multiselect-demo-list'
        aria-expanded='false'
        aria-haspopup='listbox'
      >
        <div class='c-multiselect-content'>
          <div class='c-multiselect-tags' data-multiselect-tags></div>
          <span class='c-multiselect-value' data-multiselect-value data-placeholder='true'>Wybierz</span>
        </div>
        <span class='c-multiselect-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown c-multiselect-dropdown' data-multiselect-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list c-multiselect-list' data-multiselect-list role='listbox' id='multiselect-demo-list'>
          <button class='c-multiselect-option c-multiselect-option--group' type='button' role='option' aria-selected='true' data-multiselect-option data-value='p-1' data-label='Personal details'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' checked />
            <span class='c-multiselect-option-label'>Personal details</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' aria-selected='true' data-multiselect-option data-value='i-1' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' checked />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-2' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-3' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-4' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-5' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-6' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
</div>`"
          >
            <div class="input-stack">
              <div class="c-input-field">
                <label class="c-input-label" id="multiselect-demo-label">Users</label>
                <div class="c-multiselect" data-multiselect>
                  <button
                    class="c-multiselect-trigger"
                    type="button"
                    data-multiselect-trigger
                    aria-labelledby="multiselect-demo-label"
                    aria-controls="multiselect-demo-list"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                  >
                    <div class="c-multiselect-content">
                      <div class="c-multiselect-tags" data-multiselect-tags></div>
                      <span class="c-multiselect-value" data-multiselect-value data-placeholder="true">Wybierz</span>
                    </div>
                    <span class="c-multiselect-icon"><i class="ph ph-caret-down"></i></span>
                  </button>
                  <div class="c-select-dropdown c-multiselect-dropdown" data-multiselect-dropdown aria-hidden="true">
                    <div class="c-select-dropdown-list c-multiselect-list" data-multiselect-list role="listbox" id="multiselect-demo-list">
                      <button class="c-multiselect-option c-multiselect-option--group" type="button" role="option" aria-selected="true" data-multiselect-option data-value="p-1" data-label="Personal details">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" checked />
                        <span class="c-multiselect-option-label">Personal details</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" aria-selected="true" data-multiselect-option data-value="i-1" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" checked />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-2" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-3" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-4" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-5" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                      <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-6" data-label="Item">
                        <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                        <span class="c-multiselect-option-label">Item</span>
                      </button>
                    </div>
                  </div>
                </div>
                <span class="c-input-hint">This is a hint text to help user.</span>
              </div>
            </div>
          </DocsExample>
        </DocsSubsection>

      </DocsSection>

      <!-- ICONS -->
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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
            @copy="handleCopyHtml"
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

      <!-- FEATURED ICONS -->
      <DocsSection id="featured-icons" title="Ikony wyroznione">
        <DocsSubsection id="featured-icons-light-circle" title="Light circle">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='c-featured-icon-group'>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--xs'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--s'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--l'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--xl'><i class='ph ph-lightning'></i></div>
  </div>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--gray c-featured-icon--m'><i class='ph ph-arrow-square-in'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--error c-featured-icon--m'><i class='ph ph-warning-circle'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--warning c-featured-icon--m'><i class='ph ph-warning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--success c-featured-icon--m'><i class='ph ph-check'></i></div>
  </div>
</div>`"
          >
            <div class="c-featured-icon-group">
              <div class="c-featured-icon-row">
                <div
                  v-for="size in featuredIconSizes"
                  :key="`light-circle-brand-${size.name}`"
                  class="c-featured-icon c-featured-icon--light-circle c-featured-icon--brand"
                  :class="size.class"
                >
                  <i class="ph ph-lightning"></i>
                </div>
              </div>
              <div class="c-featured-icon-row">
                <div
                  v-for="color in featuredIconColors"
                  :key="`light-circle-color-${color.name}`"
                  class="c-featured-icon c-featured-icon--light-circle c-featured-icon--m"
                  :class="color.class"
                >
                  <i class="ph" :class="color.icon"></i>
                </div>
              </div>
            </div>
          </DocsExample>
        </DocsSubsection>

        <DocsSubsection id="featured-icons-circle-outline" title="Circle outline">
          <DocsExample
            @copy="handleCopyHtml"
            :code="`<div class='c-featured-icon-group'>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--xs'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--s'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--l'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--xl'><i class='ph ph-lightning'></i></div>
  </div>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--gray c-featured-icon--m'><i class='ph ph-arrow-square-in'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--error c-featured-icon--m'><i class='ph ph-warning-circle'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--warning c-featured-icon--m'><i class='ph ph-warning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--success c-featured-icon--m'><i class='ph ph-check'></i></div>
  </div>
</div>`"
          >
            <div class="c-featured-icon-group">
              <div class="c-featured-icon-row">
                <div
                  v-for="size in featuredIconSizes"
                  :key="`circle-outline-brand-${size.name}`"
                  class="c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand"
                  :class="size.class"
                >
                  <i class="ph ph-lightning"></i>
                </div>
              </div>
              <div class="c-featured-icon-row">
                <div
                  v-for="color in featuredIconColors"
                  :key="`circle-outline-color-${color.name}`"
                  class="c-featured-icon c-featured-icon--circle-outline c-featured-icon--m"
                  :class="color.class"
                >
                  <i class="ph" :class="color.icon"></i>
                </div>
              </div>
            </div>
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

.input-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.input-stack .c-input-field {
  max-width: 400px;
}

.section-intro {
  margin: 0 0 1.5rem;
  color: var(--color-gray-600);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.section-intro a {
  color: var(--color-brand-700);
  text-decoration: underline;
}

.section-intro a:hover {
  color: var(--color-brand-800);
}

.icons-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.5rem;
  font-size: 24px;
  color: var(--color-gray-700);
}

.icons-row--large {
  font-size: 32px;
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
