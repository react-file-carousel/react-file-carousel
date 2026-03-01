import type { ComponentType, ReactNode, Ref } from 'react';

/**
 * Supported file types for carousel items.
 * Other types you could add later: env/dotenv, ini, toml, properties, sql,
 * html, svg, graphql/gql, proto, sh/bash, cfg/config.
 */
export type FileType =
  | 'csv'
  | 'json'
  | 'text'
  | 'yaml'
  | 'xml'
  | 'markdown'
  | 'log'
  | 'tsv';

export type FileData = {
  id: string | number;
  name: string;
  type: FileType;
  content: string;
};

/** Props passed to custom file type icons (e.g. size, className). */
export interface FileIconProps {
  size?: number;
  className?: string;
}

/**
 * Optional class names for each part of the carousel. Pass your own classes
 * (e.g. Tailwind or MUI) to match your app. Merged with default styles.
 */
export interface FileCarouselClassNames {
  root?: string;
  bar?: string;
  tab?: string;
  tabActive?: string;
  iconWrap?: string;
  icon?: string;
  name?: string;
  preview?: string;
  tableWrapper?: string;
  table?: string;
  tableHead?: string;
  tableRow?: string;
  tableHeaderCell?: string;
  tableBody?: string;
  tableCell?: string;
  pre?: string;
  code?: string;
  error?: string;
  empty?: string;
}

/** Props for a custom tab (file item in the bar). */
export interface FileCarouselTabSlotProps {
  file: FileData;
  active: boolean;
  onSelect: () => void;
  icon: ReactNode;
  name: ReactNode;
  /** Ref to attach to the tab root (for scroll-into-view when active). */
  ref?: Ref<HTMLElement | null>;
}

/** Props for a custom CSV/table preview. */
export interface FileCarouselTableSlotProps {
  headers: string[];
  rows: string[][];
}

/** Custom components (e.g. MUI Button, MUI Table) to replace default parts. */
export interface FileCarouselComponents {
  Tab?: ComponentType<FileCarouselTabSlotProps>;
  Table?: ComponentType<FileCarouselTableSlotProps>;
}

export interface FileCarouselProps {
  /** Array of files to display in the carousel */
  files: FileData[];
  /** ID of the initially active file. Defaults to the first file. */
  defaultActiveId?: string | number;
  /** Controlled active file ID */
  activeId?: string | number;
  /** Callback when the active file changes */
  onActiveChange?: (id: string | number) => void;
  /** Optional class name for the root container */
  className?: string;
  /** Number of spaces for JSON indentation. Defaults to 2. */
  jsonIndent?: number;
  /** Position of the carousel bar. Defaults to 'top'. */
  barPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether the bar starts expanded (uncontrolled). */
  defaultExpanded?: boolean;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Callback when expanded state changes. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Custom icons per file type. Overrides defaults for the given types. */
  fileIcons?: Partial<Record<FileType, ComponentType<FileIconProps>>>;
  /** Class names for each part (Tailwind, MUI sx classNames, etc.). */
  classNames?: Partial<FileCarouselClassNames>;
  /** Custom components for tab and table (e.g. MUI Button, MUI Table). */
  components?: FileCarouselComponents;
}

export interface CarouselBarProps {
  files: FileData[];
  activeId: string | number;
  onSelect: (id: string | number) => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  fileIcons?: Partial<Record<FileType, ComponentType<FileIconProps>>>;
  classNames?: Partial<FileCarouselClassNames>;
  components?: FileCarouselComponents;
}

export interface PreviewPaneProps {
  file: FileData;
  jsonIndent?: number;
  classNames?: Partial<FileCarouselClassNames>;
  components?: FileCarouselComponents;
}

export interface CsvPreviewProps {
  content: string;
  classNames?: Partial<FileCarouselClassNames>;
  components?: FileCarouselComponents;
}

export interface JsonPreviewProps {
  content: string;
  indent?: number;
  classNames?: Partial<FileCarouselClassNames>;
}

export interface TextPreviewProps {
  content: string;
  classNames?: Partial<FileCarouselClassNames>;
}
