/**
 * Composable for managing custom select dropdown behavior.
 * Handles opening/closing, option selection, keyboard navigation, and ARIA attributes.
 */
export function initSelect(root: HTMLElement): (() => void) | null {
  const trigger = root.querySelector<HTMLElement>('[data-select-trigger]')
  const dropdown = root.querySelector<HTMLElement>('[data-select-dropdown]')
  const valueEl = root.querySelector<HTMLElement>('[data-select-value]')
  const options = Array.from(root.querySelectorAll<HTMLElement>('[data-select-option]'))

  if (!trigger || !dropdown || !valueEl || options.length === 0) return null

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
      if (openSelect === root) return
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
    if ((trigger as HTMLButtonElement).disabled) return
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
    if (target && !root.contains(target)) close()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  // Initialize ARIA states
  options.forEach((option) => option.setAttribute('aria-selected', 'false'))
  setAriaState(false)

  // Add event listeners
  trigger.addEventListener('click', onTriggerClick)
  options.forEach((option) => option.addEventListener('click', onOptionClick))
  document.addEventListener('click', onDocumentClick)
  root.addEventListener('keydown', onKeydown)

  // Return cleanup function
  return () => {
    trigger.removeEventListener('click', onTriggerClick)
    options.forEach((option) => option.removeEventListener('click', onOptionClick))
    document.removeEventListener('click', onDocumentClick)
    root.removeEventListener('keydown', onKeydown)
  }
}

/**
 * Initialize all select elements on the page.
 * @returns Array of cleanup functions
 */
export function initAllSelects(): Array<() => void> {
  const cleanups: Array<() => void> = []

  document.querySelectorAll<HTMLElement>('[data-select]').forEach((root) => {
    const cleanup = initSelect(root)
    if (cleanup) cleanups.push(cleanup)
  })

  return cleanups
}
