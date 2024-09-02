/* eslint-disable class-methods-use-this */
import { ButtonFactory } from './ButtonFactory'
import { createElement } from './elementUtils'
import { arrowIcon, previewIcon } from './icons'
import { IButtonConfig } from './type'

// Type for Header options
type HeaderOptions = {
  onClickSave?: () => void
  onClickPublish?: () => void
  onClickPreview?: () => void
}

// Header class with improved default handling and code cleanup
export class Header {
  private mainHeader: HTMLDivElement

  private onClickSave?: HeaderOptions['onClickSave']

  private onClickPublish?: HeaderOptions['onClickPublish']

  private onClickPreview?: HeaderOptions['onClickPreview']

  constructor(options: HeaderOptions = {}) {
    this.mainHeader = this.createMainHeader()
    this.onClickSave = options.onClickSave
    this.onClickPublish = options.onClickPublish
    this.onClickPreview = options.onClickPreview
  }

  private createMainHeader(): HTMLDivElement {
    const mainHeader = createElement<HTMLDivElement>('div', {
      className: 'editable-element-header',
    })
    const mainHeaderLeft = createElement('div')
    const mainHeaderRight = createElement('div')

    const headerBack = ButtonFactory.createButton({
      className: 'e--button',
      label: '',
      icon: arrowIcon,
      onClick: () => this.handleBackClick(),
    })

    const editMetaData = ButtonFactory.createButton({
      className: 'e--button',
      label: 'edit Metadata',
      onClick: () => this.handleEditMetaDataClick(),
    })

    mainHeaderLeft.append(headerBack, editMetaData)
    const buttonsElement = this.createActionButtons()
    mainHeaderRight.append(...this.createActionButtons())

    mainHeader.append(mainHeaderLeft, mainHeaderRight)
    return mainHeader
  }

  private createActionButtons(): HTMLButtonElement[] {
    const buttons: IButtonConfig[] = [
      {
        className: 'e--button-right',
        label: 'Preview',
        icon: previewIcon,
        onClick: () => this.handlePreviewClick(),
      },
      {
        className: 'e--button-right',
        label: 'Save',
        icon: previewIcon,
        onClick: () => this.handleSaveClick(),
      },
      {
        className: 'e--button-right',
        label: 'Publish',
        icon: previewIcon,
        onClick: () => this.handlePublishClick(),
      },
    ]
    return buttons.map(ButtonFactory.createButton)
  }

  public getElement(): HTMLDivElement {
    return this.mainHeader
  }

  private handleBackClick() {
    console.log('Back button clicked')
  }

  private handleEditMetaDataClick() {
    console.log('Edit Metadata button clicked')
  }

  private handlePreviewClick(): void {
    if (this.onClickPreview) {
      this.onClickPreview()
    }
  }

  private handleSaveClick(): void {
    if (this.onClickSave) {
      this.onClickSave()
    }
  }

  private handlePublishClick() {
    if (this.onClickPublish) {
      this.onClickPublish()
    }
  }
}
