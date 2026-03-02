# API reference

## FileCarousel props

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

## FileData

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

`FileData.type`: `csv`, `json`, `text`, `yaml`, `xml`, `markdown`, `log`, `tsv`.  
CSV and JSON use dedicated previews (table / pretty-printed); the rest are plain text.
