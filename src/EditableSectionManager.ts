/* eslint-disable class-methods-use-this */

import { createElement } from './elementUtils'
import { uploadIcon } from './icons'
import { EditableValues } from './type'

type TUploadedFile = {
  name: string
  file: File
}

export class EditableSectionManager {
  private uploadedFiles: TUploadedFile[] = []

  private abortController = new AbortController()

  private cleanupFns: Array<() => void> = []

  private onChange?: (values: EditableValues) => void

  constructor(onChange?: (values: EditableValues) => void) {
    this.onChange = onChange
  }

  private notifyChange(): void {
    this.onChange?.(this.getEditableValue())
  }

  public initializeEditableSections(): void {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')
    const { signal } = this.abortController

    if (editSections.length > 0) {
      editSections.forEach((section) => {
        if (
          section.hasAttribute('data-editable-type') &&
          section.getAttribute('data-editable-type') === 'image'
        ) {
          section.classList.add('image-upload-container')
          const previousInlinePosition = section.style.position
          const computedStyle = window.getComputedStyle(section)
          const positionWasSet = computedStyle.position === 'static'
          if (positionWasSet) {
            section.style.position = 'relative'
          }

          const fileWrapper = createElement('div', {
            className: 'ee-image-wrapper',
          })

          const fileButton = document.createElement('button')
          fileButton.innerHTML = uploadIcon

          const file = document.createElement('input')
          file.type = 'file'

          fileButton.addEventListener('click', () => file.click(), { signal })

          file.addEventListener(
            'change',
            (event) => {
              const { files } = event.target as HTMLInputElement
              if (files && files.length > 0) {
                const selectedFile = files[0]
                const reader = new FileReader()
                reader.onload = () => {
                  const img = section.querySelector('img')
                  if (img) {
                    img.src = `${reader.result}`
                  }
                }
                reader.readAsDataURL(selectedFile)
                const name = `${section.getAttribute('data-editable')}`
                this.updateFile(name, selectedFile)
                this.notifyChange()
              }
            },
            { signal },
          )

          fileWrapper.append(file, fileButton)

          section.append(fileWrapper)

          this.cleanupFns.push(() => {
            fileWrapper.remove()
            section.classList.remove('image-upload-container')
            if (positionWasSet) {
              section.style.position = previousInlinePosition
            }
          })
        } else {
          const hadContentEditable = section.hasAttribute('contenteditable')
          section.setAttribute('contenteditable', 'true')
          section.classList.add('border')
          if (!section.hasAttribute('data-listener-attached')) {
            section.setAttribute('data-listener-attached', 'true')
          }

          section.addEventListener('input', () => this.notifyChange(), {
            signal,
          })

          this.cleanupFns.push(() => {
            section.classList.remove('border')
            section.removeAttribute('data-listener-attached')
            if (!hadContentEditable) {
              section.removeAttribute('contenteditable')
            }
          })
        }
      })
    } else {
      alert('No editable sections found')
    }
  }

  public destroy(): void {
    this.abortController.abort()
    this.cleanupFns.forEach((cleanup) => cleanup())
    this.cleanupFns = []
    this.uploadedFiles = []
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

  public getEditableValue(): EditableValues {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')
    const content: EditableValues = {}

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

    return content
  }
}
