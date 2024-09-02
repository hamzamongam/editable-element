// elementUtils.ts

type ElementOptions = {
  className?: string // Renamed `class` to `className` to avoid reserved keyword issues
  id?: string
}

export function createElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  options?: ElementOptions,
): T {
  const element = document.createElement(tag) as T

  if (options) {
    if (options.className) {
      element.classList.add(options.className)
    }
    if (options.id) {
      element.id = options.id
    }
  }

  return element
}

export function createButton(
  className: string,
  innerHTML: string,
): HTMLButtonElement {
  const button = document.createElement('button') as HTMLButtonElement
  button.classList.add(className)
  button.innerHTML = innerHTML
  return button
}
