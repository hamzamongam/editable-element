import { createButton } from './elementUtils'
import { IButtonConfig } from './type'

export class ButtonFactory {
 static createButton(config: IButtonConfig): HTMLButtonElement {
  const button = createButton(
   config.className,
   `${config.label} ${config.icon || ''}`,
  )
  button.addEventListener('click', config.onClick)
  return button
 }
}
