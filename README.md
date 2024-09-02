# Editable Element 

`editable-element` is a lightweight JavaScript plugin that allows you to create and manage editable content within your HTML templates. This plugin enables inline editing of specific elements by using the `data-editable` attribute.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Features

- **Attribute-Based Editing**: Easily make any HTML element editable by adding `data-editable="title"` or other similar attributes.
- **HTML Template Editing**: Modify and update content directly within your HTML templates.
- **Toolbar Integration**: Includes a toolbar with text formatting options (bold, italic, underline, etc.).
- **Custom Event Handling**: Supports `onChange` callbacks for handling content changes.
- **Preview and Save**: Built-in buttons for previewing and saving the edited content.
- **Customizable**: Highly customizable to suit various editing needs.

## Installation

You can install the plugin via npm:

```bash
npm install editable-element
```

## Usage/Examples

```html
<div data-editable="any_name"> </div>
```

```javascript
import EditableElement from 'editable-element';

const editable = new EditableElement({s
  onClickSave: (data) => {
    console.log('Content changed:', data);
  }
});
```


### browser

```html
<div data-editable="any_name"> </div>
```