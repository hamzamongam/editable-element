import { ElementProvider } from '../type'
import { createElement } from '../elementUtils'

function createTextFormattingButtons(): HTMLDivElement {
  // Define the button configurations
  const buttons = [
    { cmd: 'bold', label: 'B' },
    { cmd: 'italic', label: 'I' },
    { cmd: 'underline', label: 'U', style: 'text-decoration: underline;' },
  ]

  // Create a container for the buttons
  const container = document.createElement('div') as HTMLDivElement

  // Optional: Add a class to the container for styling purposes
  container.className = 'text-formatting-buttons'

  // Iterate over each button configuration
  buttons.forEach((button) => {
    // Create a button element
    const btn = document.createElement('button')

    // Set the button's text content
    btn.textContent = button.label

    // Apply styles if any are provided
    if (button.style) {
      btn.style.cssText = button.style
    }

    // Set additional attributes for accessibility (optional)
    btn.setAttribute('type', 'button')
    btn.setAttribute('aria-label', button.cmd)

    // Attach the click event listener to execute the formatting command
    btn.addEventListener('click', () => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        document.execCommand(button.cmd, false, '')
        selection.removeAllRanges()
      }
    })

    // Append the button to the container
    container.appendChild(btn)
  })

  // Return the container with all the buttons
  return container
}

export class TextFormatSelector implements ElementProvider {
  private element: HTMLDivElement

  constructor() {
    this.element = createElement('div')
    this.element = createTextFormattingButtons()
  }

  public getElement(): HTMLDivElement {
    return this.element
  }
}
