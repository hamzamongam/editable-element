/* eslint-disable class-methods-use-this */

import { createElement } from './elementUtils'
import { uploadIcon } from './icons'

/* eslint-disable @typescript-eslint/no-unused-vars */
export class EditableSectionManager {
  public initializeEditableSections(): void {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')

    if (editSections.length > 0) {
      editSections.forEach((section) => {
        if (
          section.hasAttribute('data-editable-type') &&
          section.getAttribute('data-editable-type') === 'image'
        ) {
          section.classList.add('image-upload-container')
          const computedStyle = window.getComputedStyle(section)
          if (computedStyle.position === 'static') {
            section.style.position = 'releative'
          }

          const fileWrapper = createElement('div', {
            className: 'ee-image-wrapper',
          })

          const fileButton = document.createElement('button')
          fileButton.innerHTML = uploadIcon

          const file = document.createElement('input')
          file.type = 'file'

          fileButton.addEventListener('click', () => {
            file.click()
          })

          file.addEventListener('change', (event) => {
            const { files } = event.target as HTMLInputElement
            if (files && files.length > 0) {
              const reader = new FileReader()
              reader.onload = () => {
                const img = section.querySelector('img')
                if (img) {
                  img.src = `${reader.result}`
                }
              }
              reader.readAsDataURL(files?.[0])
            }
          })

          fileWrapper.append(file, fileButton)

          section.append(fileWrapper)
          // Your code here
        } else {
          section.setAttribute('contenteditable', 'true')
          section.classList.add('border')
          if (!section.hasAttribute('data-listener-attached')) {
            section.setAttribute('data-listener-attached', 'true')
          }
        }
      })
    } else {
      alert('No editable sections found')
    }
  }

  public getEditableValue(): { [key: string]: string } {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')
    const content: { [key: string]: string } = {}

    editSections.forEach((section) => {
      const key = section.getAttribute('data-editable')
      if (key) {
        content[key] = section.innerHTML || ''
      }
    })

    // Call the onChange callback with the content object
    return content
  }
}
