import { EditableSectionManager } from './EditableSectionManager'
import { Header } from './Header'
import './style.scss'
import { Toolbar } from './toolbar/Toobar'
import { EditableValues } from './type'

type EditableElementOption = {
  onClickSave?: (val?: any) => void
  onClickPublish?: (val?: any) => void
  onClickPreview?: (val?: any) => void
  onClickBack?: () => void
  onClickClose?: () => void
  /** Fired whenever a text section is edited or an image is picked. */
  onChange?: (values: EditableValues) => void
}

export class EditableElement {
  private header: Header

  private toolbar: Toolbar

  private sectionManager: EditableSectionManager

  constructor(options: EditableElementOption) {
    this.header = new Header({
      onClickSave: () => {
        const values = this.sectionManager.getEditableValue()
        options.onClickSave?.(values)
      },
      onClickPreview: () => {
        const values = this.sectionManager.getEditableValue()
        options.onClickPreview?.(values)
      },
      onClickPublish: () => {
        const values = this.sectionManager.getEditableValue()
        options.onClickPublish?.(values)
      },
      onClickBack: () => {
        options.onClickBack?.()
      },
      onClickClose: () => {
        options.onClickClose?.()
      },
    })
    this.toolbar = new Toolbar()
    this.sectionManager = new EditableSectionManager(options.onChange)

    this.initialize()
  }

  private initialize(): void {
    document.body.append(this.header.getElement(), this.toolbar.getElement())
    document.body.classList.add('has-editable-active')
    this.sectionManager.initializeEditableSections()
  }

  /** Tears down all listeners and DOM nodes this instance added. */
  public destroy(): void {
    this.sectionManager.destroy()
    this.toolbar.destroy()
    this.header.destroy()
    document.body.classList.remove('has-editable-active')
  }
}
