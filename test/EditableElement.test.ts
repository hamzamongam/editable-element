import { beforeEach, describe, expect, it } from 'bun:test'
import { EditableElement } from '../src/index'

describe('EditableElement.destroy', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div data-editable="title">Hello</div>'
  })

  it('removes everything it mounted', () => {
    const editable = new EditableElement({})

    expect(document.body.classList.contains('has-editable-active')).toBe(
      true,
    )
    expect(document.querySelectorAll('.editable-element-header').length).toBe(
      1,
    )

    editable.destroy()

    expect(document.body.classList.contains('has-editable-active')).toBe(
      false,
    )
    expect(document.querySelectorAll('.editable-element-header').length).toBe(
      0,
    )
    expect(document.body.querySelector('.ee-toolbar')).toBeNull()

    const section = document.querySelector('[data-editable="title"]')!
    expect(section.hasAttribute('contenteditable')).toBe(false)
  })

  it('forwards onChange as edits happen', () => {
    const values: unknown[] = []
    const editable = new EditableElement({ onChange: (v) => values.push(v) })

    const section = document.querySelector('[data-editable="title"]')!
    section.innerHTML = 'Updated'
    section.dispatchEvent(new Event('input'))

    expect(values).toEqual([{ title: 'Updated' }])

    editable.destroy()
  })
})
