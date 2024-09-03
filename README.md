# Editable Element 

`editable-element` is a lightweight JavaScript plugin that allows you to create and manage editable content within your HTML templates. This plugin enables inline editing of specific elements by using the `data-editable` attribute.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Features

- **Attribute-Based Editing**: Easily make any HTML element editable by adding `data-editable="title"` or other similar attributes.
- **HTML Template Editing**: Modify and update content directly within your HTML templates.
- **Toolbar Integration**: Includes a toolbar with text formatting options (bold, italic, underline, etc.).
- **Custom Event Handling**: Supports `onClickSave` callbacks for handling content changes.
- **Preview and Save**: Built-in buttons for previewing and saving the edited content.
- **Customizable**: Highly customizable to suit various editing needs.

## Installation

You can install the plugin via npm:

```bash
npm install editable-element
```

## Current Version
The current version  is **v${nextRelease.version}**.

### 1.Getting Started

#### Add CSS file 
Include the necessary CSS file in your HTML:

```html
 <link rel="stylesheet" href="https://unpkg.com/editable-element/dist/umd/style.css">
```

#### Add JS file 
Include the JavaScript file and initialize the EditableElement:

```html
 <script src="https://unpkg.com/editable-element/dist/umd/editable-element.min.js"></script>
 <script>
   new EditableElement.EditableElement({
    onClickSave:(e)=>console.log(e),
    onClickPublish:(e)=>console.log(e),
    onClickPreview:(e)=>console.log(e),
    onClickBack:(e)=>console.log('Clicked Back'),
   })
 </script>
```

### 1.Set up your HTML - Text
Make any text element editable by using the data-editable attribute:

```html
<div data-editable="any_name"> </div>
```

### 1.Set up your HTML - Image
For image editing, add the data-editable-type='image' attribute:

```html
<div data-editable="any_name" data-editable-type="image">
  <img src="image_url" alt="image_alt">
</div>
```



