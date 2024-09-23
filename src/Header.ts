/* eslint-disable class-methods-use-this */
import { ButtonFactory } from './ButtonFactory'
import { createElement } from './elementUtils'
import {
  arrowIcon,
  closeIcon,
  previewIcon,
  publishIcon,
  saveIcon,
} from './icons'
import { IButtonConfig } from './type'

// Type for Header options
type HeaderOptions = {
  onClickSave?: () => void
  onClickPublish?: () => void
  onClickPreview?: () => void
  onClickBack?: () => void
  onClickClose?: () => void
}

// Header class with improved default handling and code cleanup
export class Header {
  private mainHeader: HTMLDivElement

  private onClickSave?: HeaderOptions['onClickSave']

  private onClickPublish?: HeaderOptions['onClickPublish']

  private onClickPreview?: HeaderOptions['onClickPreview']

  private onClickBack?: HeaderOptions['onClickBack']

  private onClickClose?: HeaderOptions['onClickClose']

  constructor(options: HeaderOptions = {}) {
    this.mainHeader = this.createMainHeader()
    this.onClickSave = options.onClickSave
    this.onClickPublish = options.onClickPublish
    this.onClickPreview = options.onClickPreview
    this.onClickBack = options.onClickBack
    this.onClickClose = options.onClickClose
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
        label: 'Save',
        icon: saveIcon,
        title: 'Save',
        onClick: () => this.handleSaveClick(),
      },
      {
        className: 'e--button-right',
        label: 'Preview',
        icon: previewIcon,
        title: 'Preview',
        onClick: () => this.handlePreviewClick(),
      },
      {
        className: 'e--button-right',
        label: 'Publish',
        icon: publishIcon,
        title: 'Publish',
        onClick: () => this.handlePublishClick(),
      },
      {
        className: 'e--button-right',
        icon: closeIcon,
        title: 'Close',
        onClick: () => this.handleCloseClick(),
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

  private handleCloseClick(): void {
    if (this.onClickClose) {
      this.onClickClose()
    }
  }
}
