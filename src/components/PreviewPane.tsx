import type { PreviewPaneProps } from '../types';
import { CsvPreview } from './previews/CsvPreview';
import { JsonPreview } from './previews/JsonPreview';
import { TextPreview } from './previews/TextPreview';
import styles from './PreviewPane.module.css';

const TEXT_LIKE_TYPES: Array<PreviewPaneProps['file']['type']> = [
  'text',
  'yaml',
  'xml',
  'markdown',
  'log',
  'tsv',
];

export function PreviewPane({ file, jsonIndent, classNames, components }: PreviewPaneProps) {
  const paneClass = [styles.pane, classNames?.preview ?? ''].filter(Boolean).join(' ');

  return (
    <div className={paneClass} role="tabpanel">
      {file.type === 'csv' && (
        <CsvPreview content={file.content} classNames={classNames} components={components} />
      )}
      {file.type === 'json' && (
        <JsonPreview content={file.content} indent={jsonIndent} classNames={classNames} />
      )}
      {TEXT_LIKE_TYPES.includes(file.type) && (
        <TextPreview content={file.content} classNames={classNames} />
      )}
    </div>
  );
}
