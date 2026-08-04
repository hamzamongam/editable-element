import { beforeEach, describe, expect, it } from 'bun:test'
import { EditableSectionManager } from '../src/EditableSectionManager'

const resetBody = () => {
  document.body.innerHTML = ''
}

describe('EditableSectionManager.initializeEditableSections', () => {
  beforeEach(resetBody)

  it('makes text sections contenteditable and marks them as bordered', () => {
    document.body.innerHTML = '<div data-editable="title"></div>'
    new EditableSectionManager().initializeEditableSections()

    const section = document.querySelector('[data-editable="title"]')!
    expect(section.getAttribute('contenteditable')).toBe('true')
    expect(section.classList.contains('border')).toBe(true)
    expect(section.getAttribute('data-listener-attached')).toBe('true')
  })

  it('gives statically positioned image sections a relative position so the upload button can overlay it', () => {
    document.body.innerHTML =
      '<div data-editable="hero" data-editable-type="image" style="position: static;"><img /></div>'
    const section = document.querySelector(
      '[data-editable="hero"]',
    ) as HTMLElement

    new EditableSectionManager().initializeEditableSections()

    expect(section.style.position).toBe('relative')
    expect(section.classList.contains('image-upload-container')).toBe(true)
    expect(section.querySelector('.ee-image-wrapper')).not.toBeNull()
  })

  it('does not override an already-positioned image section', () => {
    document.body.innerHTML =
      '<div data-editable="hero" data-editable-type="image" style="position: absolute;"><img /></div>'
    const section = document.querySelector(
      '[data-editable="hero"]',
    ) as HTMLElement

    new EditableSectionManager().initializeEditableSections()

    expect(section.style.position).toBe('absolute')
  })
})

describe('EditableSectionManager.getEditableValue', () => {
  beforeEach(resetBody)

  it('returns the innerHTML of text sections keyed by data-editable', () => {
    document.body.innerHTML =
      '<div data-editable="title">Hello <b>world</b></div>'
    new EditableSectionManager().initializeEditableSections()

    const manager = new EditableSectionManager()
    const values = manager.getEditableValue()
    expect(values.title).toBe('Hello <b>world</b>')
  })

  it('omits an image key until a file has been uploaded for it', () => {
    document.body.innerHTML =
      '<div data-editable="hero" data-editable-type="image"><img /></div>'
    const manager = new EditableSectionManager()
    manager.initializeEditableSections()

    expect(manager.getEditableValue().hero).toBeUndefined()
  })

  it('returns the uploaded file for an image section', async () => {
    document.body.innerHTML =
      '<div data-editable="hero" data-editable-type="image"><img /></div>'
    const manager = new EditableSectionManager()
    manager.initializeEditableSections()

    const input = document.querySelector(
      '.ee-image-wrapper input[type="file"]',
    ) as HTMLInputElement
    const file = new File(['content'], 'photo.png', { type: 'image/png' })

    Object.defineProperty(input, 'files', { value: [file] })
    input.dispatchEvent(new Event('change'))

    // FileReader.onload resolves asynchronously.
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(manager.getEditableValue().hero).toBe(file)
  })
})
