# Editable Element

`editable-element` is a lightweight JavaScript/TypeScript plugin that lets you turn parts of an existing HTML page into inline-editable content, with a floating toolbar for text formatting and image replacement. No framework required — it works directly against the DOM.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Features

- **Attribute-based editing** — make any element editable by adding `data-editable="some_key"`.
- **Inline image replacement** — add `data-editable-type="image"` to swap an `<img>` via a file picker, previewed instantly with no upload required until you call the value getter.
- **Selection toolbar** — appears on text selection with font family, font size, color, bold/italic/underline, and alignment controls.
- **Header actions** — Save / Preview / Publish / Close / Edit Metadata buttons with callbacks you provide.
- **Zero dependencies at runtime** — the whole plugin is bundled into a single UMD/ESM/CJS file plus a stylesheet.

## Installation

```bash
npm install editable-element
```

or, without a bundler, load the pre-built UMD build directly from unpkg (see [Quick start](#quick-start)).

## Quick start

### 1. Add the stylesheet

```html
<link rel="stylesheet" href="https://unpkg.com/editable-element/dist/umd/style.css">
```

### 2. Mark up your content

Text sections become `contenteditable` — the string you pass to `data-editable` is the key the value comes back under:

```html
<div data-editable="hero_title">Welcome</div>
```

Image sections get an upload button overlaid on them; the getter returns the picked `File`, not a URL:

```html
<div data-editable="hero_image" data-editable-type="image">
  <img src="/placeholder.png" alt="Hero image">
</div>
```

### 3. Initialize the plugin

**Via script tag:**

```html
<script src="https://unpkg.com/editable-element/dist/umd/editable-element.min.js"></script>
<script>
  new EditableElement.EditableElement({
    onClickSave: (values) => console.log(values),
    onClickPublish: (values) => console.log(values),
    onClickPreview: (values) => console.log(values),
    onClickBack: () => console.log('Clicked Back'),
    onClickClose: () => console.log('Closed'),
  })
</script>
```

**Via npm / TypeScript:**

```ts
import { EditableElement } from 'editable-element'
import 'editable-element/dist/umd/style.css'

const editable = new EditableElement({
  onClickSave: (values) => {
    // values is Record<string, string | File>, keyed by each data-editable value
    console.log(values)
  },
  onChange: (values) => console.log('dirty:', values),
})

// later, e.g. on route change in a single-page app:
editable.destroy()
```

Calling `new EditableElement(options)` immediately mounts the header, toolbar, and scans the page for `[data-editable]` sections. Call `.destroy()` on the instance to remove everything it added and stop listening — useful when mounting/unmounting inside an SPA route.

## API

### `new EditableElement(options)`

All options are optional. The `onClick*` options are callbacks invoked when the corresponding header button is clicked:

| Option            | Signature                          | Called with                                                          |
| ----------------- | ----------------------------------- | --------------------------------------------------------------------- |
| `onClickSave`     | `(values?: Record<string, string \| File>) => void` | Current value of every `[data-editable]` section |
| `onClickPreview`  | `(values?: Record<string, string \| File>) => void` | Same as above |
| `onClickPublish`  | `(values?: Record<string, string \| File>) => void` | Same as above |
| `onClickBack`     | `() => void` | Fired by the "edit Metadata" button |
| `onClickClose`    | `() => void` | Fired by the close button |
| `onChange`        | `(values: Record<string, string \| File>) => void` | Fired on every text edit (`input` event) and whenever an image file is picked |

### `editableElement.destroy()`

Removes the header, toolbar, and all section modifications (contenteditable attributes, upload buttons, injected classes/styles) from the DOM, and aborts every event listener the instance attached. Safe to call once; there's no re-initialize — construct a new `EditableElement` instead.

### Returned values shape

For each `[data-editable="key"]` element on the page:
- **Text sections** — `values[key]` is the section's current `innerHTML` string.
- **Image sections** — `values[key]` is the picked `File` object, and the key is **absent** until the user has actually chosen a file (there's no "existing image" fallback value).

## Toolbar behavior

Selecting text inside a `[data-editable]` section shows a floating toolbar above the selection with:
- Font family and font size selects (wrap the selection in a styled `<span>`)
- A color picker (wraps the selection in a colored `<span>`)
- Bold / Italic / Underline buttons (`document.execCommand`)
- Alignment buttons (`document.execCommand`, applies to the whole editable block, not just the selection)

The toolbar hides again as soon as the selection is cleared or the mouse is released outside an editable section.

## Development

This project uses [Bun](https://bun.sh) as its package manager and test runner.

```bash
bun install        # install dependencies
bun run build       # build dist/ (rollup)
bun run watch        # rebuild on change
bun run dev          # watch + serve index.html via browser-sync
bun run lint         # eslint src/
bun run typecheck    # tsc --noEmit for src/ and test/
bun test             # run the test suite (bun:test + happy-dom)
```

Releases are automated via [semantic-release](https://semantic-release.gitbook.io/) from Conventional Commits pushed to `main` — see `.releaserc.json` and `.github/workflows/release.yml`.
