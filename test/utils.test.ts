import { describe, expect, it } from 'bun:test'
import { createSelectElement, mergeElements } from '../src/utils'
import { ElementProvider } from '../src/type'

const fakeProvider = (tag: string): ElementProvider => ({
  getElement: () => document.createElement(tag),
})

describe('mergeElements', () => {
  it('wraps each group of providers in its own list item', () => {
    const wrapper = mergeElements([
      [fakeProvider('button'), fakeProvider('input')],
      [fakeProvider('select')],
    ])

    expect(wrapper.classList.contains('ee-toolbar')).toBe(true)
    const items = wrapper.querySelectorAll('.ee-toolbar-li')
    expect(items.length).toBe(2)
    expect(items[0].querySelectorAll('button, input').length).toBe(2)
    expect(items[1].querySelectorAll('select').length).toBe(1)
  })
})

describe('createSelectElement', () => {
  it('creates an option per entry with matching label/value', () => {
    const select = createSelectElement({
      options: [
        { label: 'Arial', value: 'Arial' },
        { label: 'Courier New', value: 'Courier New' },
      ],
    })

    expect(select.options.length).toBe(2)
    expect(select.options[0].value).toBe('Arial')
    expect(select.options[0].textContent).toBe('Arial')
    expect(select.options[1].value).toBe('Courier New')
  })

  it('applies a font-family preview style when styleProp is font-family', () => {
    const select = createSelectElement({
      options: [{ label: 'Arial', value: 'Arial' }],
      styleProp: 'font-family',
    })

    expect(select.options[0].style.fontFamily).toBe('Arial')
  })
})
