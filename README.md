# react-file-carousel

[![npm version](https://img.shields.io/npm/v/react-file-carousel.svg)](https://www.npmjs.com/package/react-file-carousel)
[![MIT License](https://img.shields.io/npm/l/react-file-carousel.svg)](https://opensource.org/licenses/MIT)

A lightweight React file preview carousel: show a list of files (icons + names) in a bar and preview the selected file’s content. Supports CSV, JSON, text, YAML, XML, Markdown, log, and TSV. Customize styles with class names, component overrides, or CSS variables to match Tailwind, Material UI, or any design system.

## Table of contents

- [Requirements](#requirements)
- [Install](#install)
- [Quick example](#quick-example)
- [Customize the UI](#customize-the-ui)
- [Custom settings](#custom-settings)
- [Styling and UI library adoption](#styling-and-ui-library-adoption)
- [API](#api)
- [Package exports](#package-exports)
- [Supported file types](#supported-file-types)
- [Demo](#demo)
- [Development](#development)
- [License](#license)

## Requirements

- **React** and **react-dom** ^18.0.0 or ^19.0.0 (peer dependencies)
- The package installs **lucide-react** and **papaparse** for default icons and CSV parsing

## Install

```bash
npm install react-file-carousel
```

To use the default styles, import the package CSS once (e.g. in your root layout or `main.tsx`):

```ts
import 'react-file-carousel/dist/index.css';
```

## Quick example

```tsx
import { FileCarousel, type FileData } from 'react-file-carousel';

const files: FileData[] = [
  { id: '1', name: 'data.json', type: 'json', content: '{"foo": "bar"}' },
  { id: '2', name: 'readme.txt', type: 'text', content: 'Hello world' },
];

export function App() {
  return (
    <div style={{ height: 400 }}>
      <FileCarousel files={files} />
    </div>
  );
}
```

## Customize the UI

To match your app’s design (Tailwind, Material UI, or custom CSS), use these in order:

1. **Class names** – Pass a `classNames` object to apply your own classes (e.g. Tailwind) to each part. See [1. Class names](#1-class-names-tailwind-global-css-mui-classname).
2. **Component overrides** – Pass a `components` object with custom `Tab` and/or `Table` (e.g. MUI `Button` and `Table`). See [2. Component overrides](#2-component-overrides-material-ui-custom-components).
3. **CSS variables** – Set `--rfc-*` variables on a parent to theme colors and spacing. See [3. CSS variables](#3-css-variables-theme-tokens).
4. **Custom icons** – Pass a `fileIcons` map to use your own icon components per file type. See [Custom icons](#custom-icons).

All of these can be combined. Example with Tailwind classes only:

```tsx
<FileCarousel
  files={files}
  classNames={{
    root: 'rounded-xl border border-slate-200',
    tab: 'rounded-lg hover:bg-slate-100',
    tabActive: 'bg-blue-100 border-blue-300',
  }}
/>
```

## Custom settings

### Custom icons

Override the default file-type icons by passing `fileIcons`: a map of file type to a React component that accepts `FileIconProps` (`size?`, `className?`).

```tsx
import { FileCarousel, type FileData, type FileIconProps } from 'react-file-carousel';

const fileIcons = {
  json: MyJsonIcon,
  csv: MyCsvIcon,
};

function MyJsonIcon({ size = 24, className }: FileIconProps) {
  return <img src="/icons/json.svg" width={size} height={size} className={className} alt="" />;
}

<FileCarousel files={files} fileIcons={fileIcons} />
```

### Bar position

Put the file bar on the top, bottom, left, or right of the preview:

```tsx
<FileCarousel files={files} barPosition="left" />
// barPosition: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
```

### Expanded (grid) mode

Let users expand the bar into a multi-row (top/bottom) or multi-column (left/right) grid:

```tsx
<FileCarousel files={files} defaultExpanded={true} />
// Or controlled: expanded, onExpandedChange
```

### Other props

| Prop | Description |
|------|-------------|
| `defaultActiveId` / `activeId` | Initial or controlled active file id |
| `onActiveChange` | Called when the user selects another file |
| `jsonIndent` | Spaces for JSON preview indentation (default: 2) |
| `className` | Extra class name on the root container |

## Styling and UI library adoption

You can match the carousel to Tailwind, Material UI, or any design system in three ways: **class names**, **component overrides**, and **CSS variables**.

### 1. Class names (Tailwind, global CSS, MUI `className`)

Use the **`classNames`** prop to pass your own classes for each part. They are merged with the default styles.

```tsx
import { FileCarousel, type FileCarouselClassNames } from 'react-file-carousel';

const classNames: Partial<FileCarouselClassNames> = {
  root: 'rounded-xl border border-slate-200 shadow-sm',
  bar: 'bg-slate-50',
  tab: 'rounded-lg px-3 py-2 hover:bg-slate-100',
  tabActive: 'bg-blue-100 text-blue-800 border-blue-300',
  iconWrap: 'shrink-0',
  name: 'text-sm truncate max-w-[6rem]',
  preview: 'bg-white p-4',
  table: 'min-w-full divide-y divide-slate-200',
  tableHeaderCell: 'px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase',
  tableCell: 'px-4 py-2 text-sm text-slate-700',
  pre: 'p-4 text-sm font-mono overflow-auto',
  code: 'text-slate-800',
};

<FileCarousel files={files} classNames={classNames} />
```

**Available keys:** `root`, `bar`, `tab`, `tabActive`, `iconWrap`, `icon`, `name`, `preview`, `tableWrapper`, `table`, `tableHead`, `tableRow`, `tableHeaderCell`, `tableBody`, `tableCell`, `pre`, `code`, `error`, `empty`.

### 2. Component overrides (Material UI, custom components)

Use the **`components`** prop to replace the default tab or table with your own (e.g. MUI `Button` and `Table`).

**Custom tab** – You receive `file`, `active`, `onSelect`, `icon`, `name`, and optional `ref` (for scroll-into-view). Render your button/chip and call `onSelect` when clicked. Attach `ref` to the root element for scroll-into-view.

```tsx
import { FileCarousel, type FileCarouselTabSlotProps } from 'react-file-carousel';
import Button from '@mui/material/Button';

function MuiTab({ file, active, onSelect, icon, name, ref }: FileCarouselTabSlotProps) {
  return (
    <Button
      ref={ref}
      variant={active ? 'contained' : 'outlined'}
      size="small"
      onClick={onSelect}
      startIcon={icon}
    >
      {name}
    </Button>
  );
}

<FileCarousel files={files} components={{ Tab: MuiTab }} />
```

**Custom table** – You receive `headers` and `rows` (string arrays). Render your table.

```tsx
import { FileCarousel, type FileCarouselTableSlotProps } from 'react-file-carousel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function MuiTable({ headers, rows }: FileCarouselTableSlotProps) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {headers.map((h, i) => (
            <TableCell key={i}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

<FileCarousel files={files} components={{ Table: MuiTable }} />
```

Icons are overridable via **`fileIcons`** (see [Custom icons](#custom-icons)).

### 3. CSS variables (theme tokens)

Set CSS custom properties on a parent to theme the carousel. All variables have fallbacks.

| Variable | Default | Description |
|----------|---------|-------------|
| `--rfc-border` | `#e2e8f0` | Borders |
| `--rfc-radius` | `0.5rem` | Root border radius |
| `--rfc-bg` | `#ffffff` | Root background |
| `--rfc-color` | `#0f172a` | Root text color |
| `--rfc-font` | `system-ui, ...` | Root font |
| `--rfc-muted-color` | `#94a3b8` | Muted / empty state text |
| `--rfc-bar-bg` | `#f8fafc` | Bar background |
| `--rfc-tab-color` | `#64748b` | Tab text |
| `--rfc-tab-hover-color` | `#334155` | Tab hover text |
| `--rfc-tab-hover-bg` | `#f1f5f9` | Tab hover background |
| `--rfc-tab-active-color` | `#1e40af` | Active tab text |
| `--rfc-tab-active-border` | `#3b82f6` | Active tab border |
| `--rfc-tab-active-bg` | `#eff6ff` | Active tab background |
| `--rfc-focus-ring` | `#3b82f6` | Focus outline |
| `--rfc-preview-bg` | `#ffffff` | Preview pane background |
| `--rfc-header-bg` | `#f1f5f9` | CSV table header background |
| `--rfc-header-color` | `#334155` | CSV table header text |
| `--rfc-row-even-bg` | `#f8fafc` | CSV even row background |
| `--rfc-row-hover-bg` | `#e2e8f0` | CSV row hover |
| `--rfc-json-key` | `#0550ae` | JSON key color |
| `--rfc-json-string` | `#0a3069` | JSON string color |
| `--rfc-json-number` | `#0550ae` | JSON number color |
| `--rfc-json-boolean` | `#cf222e` | JSON boolean color |
| `--rfc-json-null` | `#6e7781` | JSON null color |
| `--rfc-error-color` | `#ef4444` | Error text |

Example:

```css
.my-theme .react-file-carousel {
  --rfc-bar-bg: var(--my-app-surface);
  --rfc-tab-active-border: var(--my-app-primary);
  --rfc-focus-ring: var(--my-app-primary);
}
```

```tsx
<div className="my-theme">
  <FileCarousel files={files} className="react-file-carousel" />
</div>
```

## API

### FileCarousel props

| Prop | Type | Description |
|------|------|-------------|
| `files` | `FileData[]` | **Required.** Array of files to display |
| `defaultActiveId` | `string \| number` | Initial active file id |
| `activeId` | `string \| number` | Controlled active file id |
| `onActiveChange` | `(id) => void` | Called when active file changes |
| `className` | `string` | Class name for the root container |
| `jsonIndent` | `number` | JSON indent spaces (default: 2) |
| `barPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | Bar position (default: `'top'`) |
| `defaultExpanded` | `boolean` | Initial expanded state |
| `expanded` | `boolean` | Controlled expanded state |
| `onExpandedChange` | `(expanded: boolean) => void` | Called when expanded state changes |
| `fileIcons` | `Partial<Record<FileType, ComponentType<FileIconProps>>>` | Custom icons per file type |
| `classNames` | `Partial<FileCarouselClassNames>` | Custom class names per part |
| `components` | `FileCarouselComponents` | Custom `Tab` and/or `Table` components |

### FileData

```ts
type FileData = {
  id: string | number;
  name: string;
  type: FileType;  // 'csv' | 'json' | 'text' | 'yaml' | 'xml' | 'markdown' | 'log' | 'tsv'
  content: string;
};
```

## Package exports

**Components:** `FileCarousel`, `CarouselBar`, `PreviewPane`, `CsvPreview`, `JsonPreview`, `TextPreview`

**Types:** `FileData`, `FileType`, `FileIconProps`, `FileCarouselClassNames`, `FileCarouselTabSlotProps`, `FileCarouselTableSlotProps`, `FileCarouselComponents`, `FileCarouselProps`, `CarouselBarProps`, `PreviewPaneProps`, `CsvPreviewProps`, `JsonPreviewProps`, `TextPreviewProps`

## Supported file types

`FileData.type` can be: `csv`, `json`, `text`, `yaml`, `xml`, `markdown`, `log`, `tsv`.  
CSV and JSON use dedicated previews (table / pretty-printed); the rest are shown as plain text.

## Demo

**Live demo:** [react-file-carousel.github.io/react-file-carousel](https://react-file-carousel.github.io/react-file-carousel/)

The repo includes a **local demo** in the `demo/` folder (Vite + React) so you can try the carousel with different bar positions and expanded mode.

**Run the demo locally:**

```bash
cd demo && npm install && npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

The live demo is deployed to GitHub Pages via the [Deploy demo to GitHub Pages](.github/workflows/deploy-demo.yml) workflow on every push to `main`. Enable Pages in the repo **Settings → Pages** with source **GitHub Actions**.

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Type-check
npm run typecheck

# Watch mode
npm run dev
```

To run the demo app (if present in the repo):

```bash
cd demo && npm install && npm run dev
```

## License

MIT — see [LICENSE](LICENSE).
