/* eslint-disable class-methods-use-this */
import { createElement } from './elementUtils'
import { IToolbarConfig } from './type'

// Single responsibility class for Toolbar
export class Toolbar implements IToolbarConfig {
 private toolbarElement: HTMLDivElement

 constructor() {
  this.toolbarElement = this.createToolbar()
  document.addEventListener('mouseup', this.handleMouseUp.bind(this))
 }

 private handleMouseUp(event: MouseEvent): void {
  const selection = window.getSelection()
  if (
   selection &&
   selection.rangeCount > 0 &&
   selection.toString().length > 0
  ) {
   const range = selection.getRangeAt(0)
   const rect = range.getBoundingClientRect()
   this.toolbarElement.style.top = `${
    rect.top + window.scrollY - this.toolbarElement.offsetHeight - 5
   }px`
   this.toolbarElement.style.left = `${rect.left + window.scrollX}px`
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
  return toolbar
 }

 private createFontSelectors(): HTMLDivElement {
  const fonts = ['Courier New', 'Arial']
  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30]

  const fontSelect = this.createSelectElement(fonts, 'font-family')
  const sizeSelect = this.createSelectElement(fontSizes)

  const container = document.createElement('div')
  container.appendChild(fontSelect)
  container.appendChild(sizeSelect)

  fontSelect.addEventListener('change', this.handleFontChange)
  sizeSelect.addEventListener('change', this.handleSizeChange)

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
  console.log(`Font changed to: ${selectedFont}`)
 }

 private handleSizeChange(event: Event): void {
  const selectedSize = (event.target as HTMLSelectElement).value
  console.log(`Font size changed to: ${selectedSize}`)
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
