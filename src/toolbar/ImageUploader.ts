/* eslint-disable class-methods-use-this */
export class ImageUploader {
  //   constructor(parameters) {}
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
}
