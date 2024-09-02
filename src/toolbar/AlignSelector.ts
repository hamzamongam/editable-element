import { ElementProvider } from '../type'
import { createElement } from '../elementUtils'

const createAlignmentButtons = (): string => {
  const buttons = [
    { cmd: 'justifyLeft', className: 'align-left' },
    { cmd: 'justifyCenter', className: '' },
    { cmd: 'justifyRight', className: 'align-right' },
    { cmd: 'justifyFull', className: 'justify' },
  ]

  return buttons
    .map(
      (button) => `
        <button class="align-el ${button.className}" onclick="document.execCommand('${button.cmd}', false, '');">
          <span></span><span></span><span></span><span></span>
        </button>`,
    )
    .join('')
}

export class AlignSelector implements ElementProvider {
  private element: HTMLDivElement

  constructor() {
    this.element = createElement('div', { className: 'ee-aligment-selector' })
    this.element.innerHTML = createAlignmentButtons()
  }

  public getElement(): HTMLDivElement {
    return this.element
  }
}
