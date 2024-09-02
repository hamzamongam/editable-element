export interface IToolbarConfig {
  createButtons(): HTMLButtonElement[]
}

export interface IButtonConfig {
  className: string
  label: string
  icon?: string
  onClick: () => void
}
