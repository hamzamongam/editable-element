/* eslint-disable class-methods-use-this */
import { createElement } from './elementUtils'
import { IToolbarConfig } from './type'

// Single responsibility class for Toolbar
export class Toolbar implements IToolbarConfig {
 private toolbarElement: HTMLDivElement

 constructor() {
  this.toolbarElement = this.createToolbar()
 }

 private createToolbar(): HTMLDivElement {
  const toolbar = createElement<HTMLDivElement>('div', {
   className: 'editable-toolbar',
   id: 'editable-toolbar',
  })
  toolbar.innerHTML = `
         <ul>
           <li>
             ${this.createFontSelectors()}
           </li>
           <li>
             ${this.createTextFormattingButtons()}
           </li>
           <li>
             ${this.createAlignmentButtons()}
           </li>
         </ul>`
  return toolbar
 }

 private createFontSelectors(): string {
  const fonts = ['Courier New', 'Arial']
  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30]
  return `
      <select>
        ${fonts
         .map((font) => `<option style="font-family: ${font}">${font}</option>`)
         .join('')}
      </select>
      <select id="change-font-size">
        ${fontSizes
         .map((size) => `<option value="${size}px">${size}px</option>`)
         .join('')}
      </select>`
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
      </button>
    `,
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
      </button>
    `,
   )
   .join('')
 }

 public getElement(): HTMLDivElement {
  return this.toolbarElement
 }

 public createButtons(): HTMLButtonElement[] {
  // Implement this method to allow button creation
  return []
 }
}
