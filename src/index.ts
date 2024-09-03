import { EditableSectionManager } from './EditableSectionManager'
import { Header } from './Header'
import './style.scss'
import { Toolbar } from './toolbar/Toobar'

type EditableElementOption = {
  onClickSave?: (val?: any) => void
  onClickPublish?: (val?: any) => void
  onClickPreview?: (val?: any) => void
  onClickBack?: () => void
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
        options.onClickPublish?.(values)
        options.onClickPreview?.(values)
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
    })
    this.toolbar = new Toolbar()
    this.sectionManager = new EditableSectionManager()

    this.initialize()
  }

  private initialize(): void {
    document.body.append(this.header.getElement(), this.toolbar.getElement())
    document.body.classList.add('has-editable-active')
    this.sectionManager.initializeEditableSections()
  }
}
