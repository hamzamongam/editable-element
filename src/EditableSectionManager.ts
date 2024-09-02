/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class EditableSectionManager {
  public initializeEditableSections(): void {
    const editSections: NodeListOf<HTMLElement> =
      document.querySelectorAll('[data-editable]')

    if (editSections.length > 0) {
      editSections.forEach((section) => {
        section.setAttribute('contenteditable', 'true')
        section.classList.add('border')
        if (!section.hasAttribute('data-listener-attached')) {
          section.setAttribute('data-listener-attached', 'true')
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
