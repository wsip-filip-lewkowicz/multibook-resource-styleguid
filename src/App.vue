<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import 'vue-sonner/style.css'
import { Toaster, toast } from 'vue-sonner'
import { useCSSVariables } from './composables/useCSSVariables'
import { navItems } from './constants/navigation'
import AppSidebar from './components/AppSidebar.vue'

// Section components
import VariablesSection from './components/sections/VariablesSection.vue'
import TypographySection from './components/sections/TypographySection.vue'
import ButtonsSection from './components/sections/ButtonsSection.vue'
import InputsSection from './components/sections/InputsSection.vue'
import IconsSection from './components/sections/IconsSection.vue'
import FeaturedIconsSection from './components/sections/FeaturedIconsSection.vue'
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
    if (root.classList.contains('is-open')) {
      close()
    } else {
      open()
    }
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
    if (root.classList.contains('is-open')) {
      close()
    } else {
      open()
    }
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
      const tag = tempTags[i]
      if (!tag) continue
      const tagWidth = tag.offsetWidth + (i > 0 ? TAG_GAP : 0)
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
      const tag = tempTags[i]
      if (tag) tag.style.display = 'none'
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

  navItems.forEach(({ id }) => {
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

    <AppSidebar :active-section />

    <main>
      <VariablesSection
        :parsed-vars
        @copy="handleCopy"
        @copy-variable="handleCopyVariable"
      />
      <TypographySection @copy-html="handleCopyHtml" />
      <ButtonsSection @copy-html="handleCopyHtml" />
      <InputsSection @copy-html="handleCopyHtml" />
      <IconsSection @copy-html="handleCopyHtml" />
      <FeaturedIconsSection @copy-html="handleCopyHtml" />
      <SwitchesSection @copy-html="handleCopyHtml" />
      <CheckboxesSection @copy-html="handleCopyHtml" />
      <RadioSection @copy-html="handleCopyHtml" />
    </main>

    <Toaster position="bottom-right" :duration="2000" />
  </div>
</template>

