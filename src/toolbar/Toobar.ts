import { createElement } from '../elementUtils'

class Toolbar {
  private toolbarElement: HTMLDivElement

  constructor() {
    this.toolbarElement = createElement('div', { className: '' })
  }
}

const t = new Toolbar()

const data = [1, 2, 3, 4, 5, 6, 7]

const cret = () => {
  const el: HTMLElement[] = []
  data.forEach((v) => {
    const liElement = createElement('li')
    liElement.textContent = `${v}`
    el.push(liElement)
  })
}
