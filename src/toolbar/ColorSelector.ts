/* eslint-disable class-methods-use-this */
import { ElementProvider } from '../type'

export class ColorSelector implements ElementProvider {
  private element: HTMLInputElement

  constructor() {
    this.element = document.createElement('input')
    this.element.type = 'color'
    this.element.addEventListener('change', this.handleColorChange.bind(this))
  }

  public getElement(): HTMLDivElement {
    return this.element
  }

  private handleColorChange(event: Event): void {
    const color = (event.target as HTMLSelectElement).value
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      // Create a span element with the selected color
      const span = document.createElement('span')
      span.style.color = color
      span.textContent = selectedText

      // Replace the selected text with the colored span
      range.deleteContents()
      range.insertNode(span)
      selection.removeAllRanges()
    }
  }
}
