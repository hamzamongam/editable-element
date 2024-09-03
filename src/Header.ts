/* eslint-disable class-methods-use-this */
import { ButtonFactory } from './ButtonFactory'
import { createElement } from './elementUtils'
import { arrowIcon, previewIcon, publishIcon, saveIcon } from './icons'
import { IButtonConfig } from './type'

// Type for Header options
type HeaderOptions = {
  onClickSave?: () => void
  onClickPublish?: () => void
  onClickPreview?: () => void
  onClickBack?: () => void
}

// Header class with improved default handling and code cleanup
export class Header {
  private mainHeader: HTMLDivElement

  private onClickSave?: HeaderOptions['onClickSave']

  private onClickPublish?: HeaderOptions['onClickPublish']

  private onClickPreview?: HeaderOptions['onClickPreview']

  private onClickBack?: HeaderOptions['onClickBack']

  constructor(options: HeaderOptions = {}) {
    this.mainHeader = this.createMainHeader()
    this.onClickSave = options.onClickSave
    this.onClickPublish = options.onClickPublish
    this.onClickPreview = options.onClickPreview
    this.onClickBack = options.onClickBack
  }

  private createMainHeader(): HTMLDivElement {
    const mainHeader = createElement<HTMLDivElement>('div', {
      className: 'editable-element-header',
    })
    const mainHeaderLeft = createElement('div')
    const mainHeaderRight = createElement('div')

    // const headerBack = ButtonFactory.createButton({
    //   className: 'e--button',
    //   label: '',
    //   icon: arrowIcon,
    //   onClick: () => this.handleBackClick(),
    // })

    const editMetaData = ButtonFactory.createButton({
      preFixIcon: arrowIcon,
      className: 'e--button',
      label: 'edit Metadata',
      onClick: () => this.handleEditMetaDataClick(),
    })

    mainHeaderLeft.append(editMetaData)
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
        icon: saveIcon,
        onClick: () => this.handleSaveClick(),
      },
      {
        className: 'e--button-right',
        label: 'Publish',
        icon: publishIcon,
        onClick: () => this.handlePublishClick(),
      },
    ]
    return buttons.map(ButtonFactory.createButton)
  }

  public getElement(): HTMLDivElement {
    return this.mainHeader
  }

  private handleEditMetaDataClick(): void {
    if (this.onClickBack) {
      this.onClickBack()
    }
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

  private handlePublishClick(): void {
    if (this.onClickPublish) {
      this.onClickPublish()
    }
  }
}
