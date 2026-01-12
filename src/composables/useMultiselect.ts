/**
 * Composable for managing custom multiselect dropdown behavior.
 * Handles opening/closing, multiple option selection, tag rendering, keyboard navigation, and ARIA attributes.
 */
export function initMultiselect(root: HTMLElement): (() => void) | null {
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
    options.forEach((opt) => opt.classList.remove('is-highlighted'))
    highlightedIndex = Math.max(0, Math.min(index, options.length - 1))
    const option = options[highlightedIndex]
    if (option) {
      option.classList.add('is-highlighted')
      option.scrollIntoView({ block: 'nearest' })
    }
  }

  const clearHighlight = () => {
    options.forEach((opt) => opt.classList.remove('is-highlighted'))
    highlightedIndex = -1
  }

  const close = () => {
    root.classList.remove('is-open')
    setAriaState(false)
    clearHighlight()
  }

  const closeOtherSelects = () => {
    document.querySelectorAll<HTMLElement>('[data-multiselect].is-open').forEach((openSelect) => {
      if (openSelect === root) return
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
    const hasVisibleTags = tagsContainer.querySelector(
      '.c-multiselect-tag:not([style*="display: none"])',
    )
    if (!hasVisibleTags) {
      valueEl.textContent = 'Wybierz'
      valueEl.setAttribute('data-placeholder', 'true')
    } else {
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
    const selectedOptions = options.filter((opt) => opt.getAttribute('aria-selected') === 'true')

    if (selectedOptions.length === 0) {
      updatePlaceholder()
      return
    }

    const tempTags: HTMLElement[] = []
    selectedOptions.forEach((option) => {
      const label = option.dataset.label || option.textContent?.trim()
      const value = option.dataset.value
      if (!label || !value) return

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
      if (currentWidth + tagWidth > availableWidth && i > 0) break
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
    if (trigger.disabled) return
    event.preventDefault()
    toggle()
  }

  const onOptionClick = (event: Event) => {
    const option = event.currentTarget as HTMLElement
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    const isSelected = option.getAttribute('aria-selected') === 'true'
    option.setAttribute('aria-selected', isSelected ? 'false' : 'true')
    if (checkbox) checkbox.checked = !isSelected
    renderTags()
  }

  const onDocumentClick = (event: Event) => {
    const target = event.target as Node | null
    if (target && !root.contains(target)) close()
  }

  const onKeydown = (event: KeyboardEvent) => {
    const isOpen = root.classList.contains('is-open')

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          open()
          setHighlighted(0)
        } else {
          setHighlighted(highlightedIndex + 1)
        }
        break

      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) {
          open()
          setHighlighted(options.length - 1)
        } else {
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
            if (checkbox) checkbox.checked = !isSelected
            renderTags()
          }
        } else if (!isOpen) {
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
    if (!removeButton) return
    const value = removeButton.getAttribute('data-multiselect-tag-remove')
    const option = options.find((item) => item.dataset.value === value)
    if (!option) return
    option.setAttribute('aria-selected', 'false')
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    if (checkbox) checkbox.checked = false
    renderTags()
  }

  // Initialize ARIA states and checkboxes
  options.forEach((option) => {
    const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]')
    const isSelected = option.getAttribute('aria-selected') === 'true' || checkbox?.checked
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false')
    if (checkbox) checkbox.checked = !!isSelected
  })
  setAriaState(false)
  renderTags()

  // Add event listeners
  trigger.addEventListener('click', onTriggerClick)
  options.forEach((option, index) => {
    option.addEventListener('click', onOptionClick)
    option.addEventListener('mouseenter', () => setHighlighted(index))
  })
  tagsContainer.addEventListener('click', onTagsClick)
  document.addEventListener('click', onDocumentClick)
  root.addEventListener('keydown', onKeydown)

  // Watch for container resize to update tag visibility
  const resizeObserver = new ResizeObserver(() => {
    renderTags()
  })
  resizeObserver.observe(tagsContainer)

  // Return cleanup function
  return () => {
    trigger.removeEventListener('click', onTriggerClick)
    options.forEach((option) => option.removeEventListener('click', onOptionClick))
    tagsContainer.removeEventListener('click', onTagsClick)
    document.removeEventListener('click', onDocumentClick)
    root.removeEventListener('keydown', onKeydown)
    resizeObserver.disconnect()
  }
}

/**
 * Initialize all multiselect elements on the page.
 * @returns Array of cleanup functions
 */
export function initAllMultiselects(): Array<() => void> {
  const cleanups: Array<() => void> = []

  document.querySelectorAll<HTMLElement>('[data-multiselect]').forEach((root) => {
    const cleanup = initMultiselect(root)
    if (cleanup) cleanups.push(cleanup)
  })

  return cleanups
}
