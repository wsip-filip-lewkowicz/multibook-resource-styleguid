function closeOtherDropdowns(
  selector: string,
  root: HTMLElement,
  close: (openSelect: HTMLElement) => void,
): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((openSelect) => {
    if (openSelect === root) {
      return
    }

    close(openSelect)
  })
}

export function createOutsideClickHandler(
  root: HTMLElement,
  close: () => void,
): (event: Event) => void {
  return (event: Event) => {
    const target = event.target as Node | null
    if (target && !root.contains(target)) {
      close()
    }
  }
}

export function createDropdownController(options: {
  root: HTMLElement
  trigger: HTMLElement
  dropdown: HTMLElement
  openSelector: string
  resetOther: (openSelect: HTMLElement) => void
  onClose?: () => void
}) {
  const { root, trigger, dropdown, openSelector, resetOther, onClose } = options

  const setAriaState = (open: boolean) => {
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false')
    dropdown.setAttribute('aria-hidden', open ? 'false' : 'true')
  }

  const close = () => {
    root.classList.remove('is-open')
    setAriaState(false)
    onClose?.()
  }

  const open = () => {
    closeOtherDropdowns(openSelector, root, resetOther)
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

  return { setAriaState, close, open, toggle }
}
