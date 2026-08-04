import { ElementProvider, OptionType } from '../type'
import { createSelectElement } from '../utils'

const fonts = ['Courier New', 'Arial']

const options: OptionType[] = fonts.map((v) => ({
  label: v,
  value: v,
}))

export class FontSelector implements ElementProvider {
  private element: HTMLSelectElement

  constructor() {
    this.element = createSelectElement({ options, styleProp: 'font-family' })
    this.element.addEventListener('change', this.handleFontChange.bind(this))
  }

  public getElement(): HTMLSelectElement {
    return this.element
  }

  // eslint-disable-next-line class-methods-use-this
  private handleFontChange(event: Event): void {
    const { value } = event.target as HTMLSelectElement
    const fontFamily = value
    const selection = window.getSelection()
    if (selection && selection.rangeCount) {
      const range = selection.getRangeAt(0)

      // Create a new span element to apply the font family
      const span = document.createElement('span')
      span.style.fontFamily = fontFamily

      // If the selection is within an existing span, unwrap it first
      const parentSpan = range.startContainer.parentNode as HTMLElement
      if (
        parentSpan &&
        parentSpan.nodeName === 'SPAN' &&
        parentSpan.style.fontFamily
      ) {
        range.surroundContents(span)

        // Remove the original span, keeping only the newly created one
        const parentNode = parentSpan.parentNode as HTMLElement
        while (parentSpan.firstChild) {
          parentNode.insertBefore(parentSpan.firstChild, parentSpan)
        }
        parentNode.removeChild(parentSpan)
      } else {
        // Directly wrap the selection with the new span
        range.surroundContents(span)
      }

      // Collapse the selection to the end of the newly inserted span
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}
