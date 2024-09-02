/* eslint-disable class-methods-use-this */
import { createElement } from './elementUtils'
import { IToolbarConfig } from './type'

// Single responsibility class for Toolbar
export class Toolbar implements IToolbarConfig {
  private toolbarElement: HTMLDivElement

  private isFontSize = true

  constructor() {
    this.toolbarElement = this.createToolbar()
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  private handleMouseUp(event: MouseEvent): void {
    const selection = window.getSelection()
    if (
      selection &&
      selection.rangeCount > 0 &&
      selection.toString().trim().length > 0 // Ensure at least 1 visible character is selected
    ) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      // Calculate the initial top and left positions for the toolbar
      const top =
        rect.top + window.scrollY - this.toolbarElement.offsetHeight - 5
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

  private createToolbar(): HTMLDivElement {
    // Create the toolbar container
    const toolbar = document.createElement('div')
    toolbar.className = 'editable-toolbar'
    toolbar.id = 'editable-toolbar'

    // Create the unordered list element
    const ul = document.createElement('ul')

    // Create and append font selectors
    const fontSelectorLi = document.createElement('li')
    fontSelectorLi.appendChild(this.createFontSelectors())
    ul.appendChild(fontSelectorLi)

    // Create and append text formatting buttons
    const textFormattingLi = document.createElement('li')
    textFormattingLi.innerHTML = this.createTextFormattingButtons()
    ul.appendChild(textFormattingLi)

    // Create and append alignment buttons
    const alignmentLi = document.createElement('li')
    alignmentLi.innerHTML = this.createAlignmentButtons()
    ul.appendChild(alignmentLi)

    // Append the list to the toolbar container
    toolbar.appendChild(ul)

    return toolbar
  }

  private createFontSelectors(): HTMLDivElement {
    const fonts = ['Courier New', 'Arial']
    const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30]

    const fontSelect = this.createSelectElement(fonts, 'font-family')
    const sizeSelect = this.createSelectElement(fontSizes)
    const colorPicker = document.createElement('input')
    colorPicker.type = 'color'

    const container = document.createElement('div')
    container.appendChild(fontSelect)
    container.appendChild(sizeSelect)
    container.appendChild(colorPicker)

    fontSelect.addEventListener('change', this.handleFontChange)
    sizeSelect.addEventListener('change', this.handleSizeChange)
    colorPicker.addEventListener('change', this.handleColorChange)

    return container
  }

  private createSelectElement(
    options: (string | number)[],
    styleProp?: string,
  ): HTMLSelectElement {
    const select = document.createElement('select')
    options.forEach((option) => {
      const optionElement = document.createElement('option')
      if (styleProp === 'font-family') {
        optionElement.style.fontFamily = option as string
      }
      optionElement.value = `${option}`
      optionElement.textContent = `${option}`
      select.appendChild(optionElement)
    })
    return select
  }

  private handleFontChange(event: Event): void {
    const selectedFont = (event.target as HTMLSelectElement).value
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
    }
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

  private handleSizeChange(event: Event): void {
    const { value } = event.target as HTMLSelectElement
    const fontSize = value ? `${value}px` : ''
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

  private createTextFormattingButtons(): string {
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

  private createAlignmentButtons(): string {
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

  public getElement(): HTMLDivElement {
    return this.toolbarElement
  }

  public createButtons(): HTMLButtonElement[] {
    return [] // Implement this method to allow button creation
  }
}

function formatText(command: string, value?: string): void {
  document.execCommand(command, false, value)
}
