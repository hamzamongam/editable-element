import { createButton } from './elementUtils'
import { IButtonConfig } from './type'

export class ButtonFactory {
  static createButton(config: IButtonConfig): HTMLButtonElement {
    const button = createButton(
      config.className,
      `${config.preFixIcon || ''} ${config.label || ''} ${config.icon || ''}`,
    )
    button.setAttribute('title', `${config.title}`)
    button.addEventListener('click', config.onClick)
    return button
  }
}
