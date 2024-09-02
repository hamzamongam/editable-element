import { EditableSectionManager } from './EditableSectionManager'
import { Header } from './Header'
import { Toolbar } from './Toolbar'
import './style.scss'

type EditableElementOption = {
  onClickSave?: (val?: any) => void
  onClickPublish?: () => void
  onClickPreview?: () => void
}

export class EditableElement {
  private header: Header

  private toolbar: Toolbar

  private sectionManager: EditableSectionManager

  constructor(options: EditableElementOption) {
    this.header = new Header({
      onClickSave: () => {
        const values = this.sectionManager.getEditableValue()
        console.log({ values })
        // options.onClickSave?.(values)
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
