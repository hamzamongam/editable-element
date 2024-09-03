/* eslint-disable class-methods-use-this */

import { createElement } from './elementUtils'
import { uploadIcon } from './icons'

type TUploadedFile = {
  name: string
  file: File
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export class EditableSectionManager {
  private uploadedFiles: TUploadedFile[] = []

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
              const file = files?.[0]
              const reader = new FileReader()
              reader.onload = () => {
                const img = section.querySelector('img')
                if (img) {
                  img.src = `${reader.result}`
                }
              }
              reader.readAsDataURL(file)
              const name = `${section.getAttribute('data-editable')}`
              this.updateFile(name, file)
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

  private updateFile(name: string, newFile: File): void {
    // Find the index of the existing file with the same name
    const index = this.uploadedFiles.findIndex((file) => file.name === name)

    if (index !== -1) {
      // Replace the existing file with the new one
      this.uploadedFiles[index] = { name, file: newFile }
    } else {
      // If the file does not exist, add it as a new entry
      this.uploadedFiles.push({ name, file: newFile })
    }
  }

  private findUploadFile(fileName: string): TUploadedFile | undefined {
    return this.uploadedFiles.find((file) => file.name === fileName)
  }

  public getEditableValue(): { [key: string]: string | File } {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')
    const content: { [key: string]: string | File } = {}

    editSections.forEach((section) => {
      const key = section.getAttribute('data-editable')
      const IsImage = section.getAttribute('data-editable-type') === 'image'
      if (key) {
        if (IsImage) {
          const file = this.findUploadFile(key)
          if (this.uploadedFiles.length > 0 && file) {
            content[key] = file.file
          }
        } else {
          content[key] = section.innerHTML || ''
        }
      }
    })

    // Call the onChange callback with the content object
    return content
  }
}
