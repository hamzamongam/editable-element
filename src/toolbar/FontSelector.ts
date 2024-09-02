import { ElementProvider, OptionType } from '../type'
import { createSelectElement } from '../utils'

const fonts = ['Courier New', 'Arial']

const options: OptionType[] = fonts.map((v) => ({
  label: `${v}px`,
  value: `${v}px`,
}))

export class FontSelector implements ElementProvider {
  private element: HTMLSelectElement

  constructor() {
    this.element = createSelectElement({ options })
    this.element.addEventListener('change', this.handleFontChange.bind(this))
  }

  public getElement(): HTMLSelectElement {
    return this.element
  }

  // eslint-disable-next-line class-methods-use-this
  private handleFontChange(event: Event): void {
    const selectedFont = (event.target as HTMLSelectElement).value
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
    }
  }
}
