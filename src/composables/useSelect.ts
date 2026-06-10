import { createDropdownController, createOutsideClickHandler } from './dropdown-utils'

/**
 * Composable for managing custom select dropdown behavior.
 * Handles opening/closing, option selection, keyboard navigation, and ARIA attributes.
 */
function initSelect(root: HTMLElement): (() => void) | null {
  const trigger = root.querySelector<HTMLElement>('[data-select-trigger]')
  const dropdown = root.querySelector<HTMLElement>('[data-select-dropdown]')
  const valueEl = root.querySelector<HTMLElement>('[data-select-value]')
  const options = Array.from(root.querySelectorAll<HTMLElement>('[data-select-option]'))

  if (!trigger || !dropdown || !valueEl || options.length === 0) return null

  const { setAriaState, close, toggle } = createDropdownController({
    root,
    trigger,
    dropdown,
    openSelector: '[data-select].is-open',
    resetOther: (openSelect) => {
      openSelect.classList.remove('is-open')
      const otherTrigger = openSelect.querySelector<HTMLElement>('[data-select-trigger]')
      const otherDropdown = openSelect.querySelector<HTMLElement>('[data-select-dropdown]')
      otherTrigger?.setAttribute('aria-expanded', 'false')
      otherDropdown?.setAttribute('aria-hidden', 'true')
    },
  })

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

  const onDocumentClick = createOutsideClickHandler(root, close)

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  options.forEach((option) => option.setAttribute('aria-selected', 'false'))
  setAriaState(false)

  trigger.addEventListener('click', onTriggerClick)
  options.forEach((option) => option.addEventListener('click', onOptionClick))
  document.addEventListener('click', onDocumentClick)
  root.addEventListener('keydown', onKeydown)

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
