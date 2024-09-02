import { createElement } from './elementUtils'
import { ElementProvider, OptionType } from './type'

export const mergeElements = (
  elements: ElementProvider[][],
): HTMLDivElement => {
  const element = createElement('div', {
    className: 'ee-toolbar',
  }) as HTMLDivElement
  const elementUl = createElement('ul', { className: 'ee-toolbar-ui' })

  elements.forEach((el) => {
    const elementLi = createElement('li', { className: 'ee-toolbar-li' })
    const insideLi = createElement('div', {
      className: 'ee-toolbar-inside-div',
    }) as HTMLDivElement
    el.forEach((e) => {
      insideLi.append(e.getElement())
    })
    elementLi.append(insideLi)
    elementUl.append(elementLi)
  })

  element.append(elementUl)
  return element
}

export const createSelectElement = ({
  options,
  className,
  styleProp,
}: {
  options: OptionType[]
  styleProp?: string
  className?: string
}): HTMLSelectElement => {
  const select = document.createElement('select')
  if (className) {
    select.classList.add(className)
  }

  options.forEach((option) => {
    const optionElement = document.createElement('option')
    if (styleProp === 'font-family') {
      optionElement.style.fontFamily = option as string
    }
    optionElement.value = `${option.value}`
    optionElement.textContent = `${option.label}`
    select.appendChild(optionElement)
  })
  return select
}
