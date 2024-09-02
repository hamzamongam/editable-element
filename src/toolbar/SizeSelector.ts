/* eslint-disable class-methods-use-this */
import { ElementProvider, OptionType } from '../type'
import { createSelectElement } from '../utils'

const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30]

const options: OptionType[] = fontSizes.map((v) => ({
  label: `${v}px`,
  value: `${v}px`,
}))
export class SizeSelector implements ElementProvider {
  private element: HTMLSelectElement

  constructor() {
    this.element = createSelectElement({ options })
    this.element.addEventListener('change', this.handleSizeChange.bind(this))
  }

  public getElement(): HTMLSelectElement {
    return this.element
  }

  private handleSizeChange(event: Event): void {
    const { value } = event.target as HTMLSelectElement
    const fontSize = value
    const selection = window.getSelection()
    if (selection && selection.rangeCount) {
      const range = selection.getRangeAt(0)

      // Create a new span element to apply the font size
      const span = document.createElement('span')
      span.style.fontSize = fontSize

      // If the selection is within an existing span, unwrap it first
      const parentSpan = range.startContainer.parentNode as HTMLElement
      if (
        parentSpan &&
        parentSpan.nodeName === 'SPAN' &&
        parentSpan.style.fontSize
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
