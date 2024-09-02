import { ElementProvider } from '../type'
import { createElement } from '../elementUtils'

const createTextFormattingButtons = (): string => {
  const buttons = [
    { cmd: 'bold', label: 'B' },
    { cmd: 'italic', label: '/' },
    { cmd: 'underline', label: 'U', style: 'text-decoration: underline' },
  ]

  return buttons
    .map(
      (button) => `
      <button onclick="document.execCommand('${button.cmd}', false, '');" ${
        button.style ? `style="${button.style}"` : ''
      }>
        ${button.label}
      </button>`,
    )
    .join('')
}

export class TextFormatSelector implements ElementProvider {
  private element: HTMLDivElement

  constructor() {
    this.element = createElement('div')
    this.element.innerHTML = createTextFormattingButtons()
  }

  public getElement(): HTMLDivElement {
    return this.element
  }
}
