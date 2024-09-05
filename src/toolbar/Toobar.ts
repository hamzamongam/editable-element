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

    this.handleMouseUp()
  }

  public getElement(): HTMLDivElement {
    return this.toolbarElement
  }

  private handleMouseUp(): void {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')

    editSections.forEach((element) => {
      // Ensure event listeners are not duplicated
      element.removeEventListener('mouseup', this.mouseUpHandler)
      element.addEventListener('mouseup', this.mouseUpHandler.bind(this))
    })
  }

  private mouseUpHandler(event: MouseEvent): void {
    const selection = window.getSelection()

    if (
      selection &&
      selection?.rangeCount > 0 &&
      selection.toString().trim().length > 0 // Ensure at least 1 visible character is selected
    ) {
      const range = selection.getRangeAt(0)
      const targetElement = event.currentTarget as HTMLElement

      if (targetElement.contains(range.commonAncestorContainer)) {
        const rect = range.getBoundingClientRect()

        // Calculate toolbar position
        const top = rect.top + window.scrollY - 5
        let left = rect.left + window.scrollX

        // Toolbar overflow handling for right edge
        const toolbarWidth = 460
        const viewportWidth = window.innerWidth

        if (left + toolbarWidth > viewportWidth) {
          left = viewportWidth - toolbarWidth - 10 // Ensure toolbar doesn't overflow the viewport
        }

        // Position the toolbar
        this.toolbarElement.style.top = `${top + rect.height + 20}px`
        this.toolbarElement.style.left = `${left}px`
        this.toolbarElement.style.display = 'inline-flex'
      } else {
        this.toolbarElement.style.display = 'none'
      }
    } else {
      this.toolbarElement.style.display = 'none' // Hide toolbar if no text is selected
    }
  }
}
