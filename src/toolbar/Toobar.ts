import { ElementProvider } from '../type'
import { mergeElements } from '../utils'
import { AlignSelector } from './AlignSelector'
import { ColorSelector } from './ColorSelector'
import { FontSelector } from './FontSelector'
import { SizeSelector } from './SizeSelector'
import { TextFormatSelector } from './TextFormatSelector'

export class Toolbar implements ElementProvider {
  private toolbarElement: HTMLDivElement

  constructor() {
    this.toolbarElement = mergeElements([
      [new FontSelector(), new SizeSelector(), new ColorSelector()],
      [new TextFormatSelector()],
      [new AlignSelector()],
    ])
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  public getElement(): HTMLDivElement {
    return this.toolbarElement
  }

  private handleMouseUp(): void {
    const selection = window.getSelection()
    if (
      selection &&
      selection.rangeCount > 0 &&
      selection.toString().trim().length > 0 // Ensure at least 1 visible character is selected
    ) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      // Calculate the initial top and left positions for the toolbar
      const top = rect.top + window.scrollY - 5
      let left = rect.left + window.scrollX

      // Check if the toolbar would overflow the right edge of the window
      const toolbarWidth = 460
      const viewportWidth = window.innerWidth
      if (left + toolbarWidth > viewportWidth) {
        // Adjust the left position to ensure the toolbar stays within the viewport
        left = viewportWidth - toolbarWidth - 10 // 10px padding from the edge
      }

      // Position the toolbar
      this.toolbarElement.style.top = `${top + rect.height + 20}px`
      this.toolbarElement.style.left = `${left}px`
      this.toolbarElement.style.display = 'inline-flex'
    } else {
      this.toolbarElement.style.display = 'none'
    }
  }
}
