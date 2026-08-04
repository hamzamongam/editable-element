import { beforeEach, describe, expect, it } from 'bun:test'
import { Toolbar } from '../src/toolbar/Toobar'

describe('Toolbar.destroy', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('removes the toolbar element from the DOM', () => {
    const toolbar = new Toolbar()
    document.body.append(toolbar.getElement())

    toolbar.destroy()

    expect(document.body.contains(toolbar.getElement())).toBe(false)
  })

  it('stops repositioning itself on selection after destroy', () => {
    document.body.innerHTML = '<div data-editable="title">Hello world</div>'
    const section = document.querySelector('[data-editable="title"]')!
    const toolbar = new Toolbar()
    document.body.append(toolbar.getElement())
    toolbar.destroy()

    // A selection that, if the mouseup handler still ran, would reposition
    // and show the toolbar.
    const originalGetSelection = window.getSelection
    window.getSelection = () =>
      ({
        rangeCount: 1,
        toString: () => 'selected text',
        getRangeAt: () => ({
          commonAncestorContainer: section,
          getBoundingClientRect: () => ({ top: 0, left: 0, height: 10 }),
        }),
      }) as unknown as Selection

    toolbar.getElement().style.display = 'none'
    section.dispatchEvent(new MouseEvent('mouseup'))
    window.getSelection = originalGetSelection

    expect(toolbar.getElement().style.display).toBe('none')
  })
})
