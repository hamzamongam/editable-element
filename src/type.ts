export interface IToolbarConfig {
  createButtons(): HTMLButtonElement[]
}

export interface IButtonConfig {
  preFixIcon?: string
  className: string
  label: string
  icon?: string
  onClick: () => void
}

export interface ElementProvider {
  getElement(): HTMLElement
}

export interface OptionType {
  value?: any
  label?: string
}
