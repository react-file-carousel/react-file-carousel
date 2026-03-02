# Styling and UI library adoption

Match the carousel to Tailwind, Material UI, or any design system using **class names**, **component overrides**, or **CSS variables**. See the [main README](../README.md) for a quick overview.

## 1. Class names

Use the `classNames` prop to pass your own classes for each part. They are merged with the default styles.

**Available keys:** `root`, `bar`, `tab`, `tabActive`, `iconWrap`, `icon`, `name`, `preview`, `tableWrapper`, `table`, `tableHead`, `tableRow`, `tableHeaderCell`, `tableBody`, `tableCell`, `pre`, `code`, `error`, `empty`.

### Example (Tailwind)

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

## 2. Component overrides

Use the `components` prop to replace the default tab or table (e.g. MUI `Button` and `Table`).

### Custom tab

You receive `file`, `active`, `onSelect`, `icon`, `name`, and optional `ref`. Call `onSelect` when clicked; attach `ref` to the root element for scroll-into-view.

```tsx
import { FileCarousel, type FileCarouselTabSlotProps } from 'react-file-carousel';
import Button from '@mui/material/Button';

function MuiTab({ file, active, onSelect, icon, name, ref }: FileCarouselTabSlotProps) {
  return (
    <Button ref={ref} variant={active ? 'contained' : 'outlined'} size="small" onClick={onSelect} startIcon={icon}>
      {name}
    </Button>
  );
}

<FileCarousel files={files} components={{ Tab: MuiTab }} />
```

### Custom table

You receive `headers` and `rows` (string arrays).

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

Icons are overridable via `fileIcons` (see main README).

## 3. CSS variables

Set these on a parent to theme the carousel. All have fallbacks.

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

**Example:**

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
