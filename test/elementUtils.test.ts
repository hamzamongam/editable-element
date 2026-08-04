import { describe, expect, it } from 'bun:test'
import { createButton, createElement } from '../src/elementUtils'

describe('createElement', () => {
  it('creates an element of the requested tag', () => {
    const el = createElement('div')
    expect(el.tagName).toBe('DIV')
  })

  it('applies className and id when provided', () => {
    const el = createElement('span', { className: 'foo', id: 'bar' })
    expect(el.classList.contains('foo')).toBe(true)
    expect(el.id).toBe('bar')
  })

  it('leaves className and id unset when omitted', () => {
    const el = createElement('div')
    expect(el.className).toBe('')
    expect(el.id).toBe('')
  })
})

describe('createButton', () => {
  it('creates a button with the given class and inner HTML', () => {
    const button = createButton('e--button', '<span>Save</span>')
    expect(button.tagName).toBe('BUTTON')
    expect(button.classList.contains('e--button')).toBe(true)
    expect(button.innerHTML).toBe('<span>Save</span>')
  })
})
