import { useMemo } from 'react';
import Papa from 'papaparse';
import type { CsvPreviewProps } from '../../types';
import styles from './CsvPreview.module.css';

export function CsvPreview({ content, classNames, components }: CsvPreviewProps) {
  const { headers, rows, error } = useMemo(() => {
    const result = Papa.parse<string[]>(content, {
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      return { headers: [], rows: [], error: result.errors[0].message };
    }

    const [headers, ...rows] = result.data;
    return { headers: headers ?? [], rows, error: null };
  }, [content]);

  if (error) {
    const errClass = [styles.error, classNames?.error ?? ''].filter(Boolean).join(' ');
    return (
      <div className={errClass}>
        Failed to parse CSV: {error}
      </div>
    );
  }

  if (headers.length === 0) {
    const emptyClass = [styles.empty, classNames?.empty ?? ''].filter(Boolean).join(' ');
    return <div className={emptyClass}>No data</div>;
  }

  if (components?.Table) {
    const CustomTable = components.Table;
    return (
      <div className={[styles.wrapper, classNames?.tableWrapper ?? ''].filter(Boolean).join(' ')}>
        <CustomTable headers={headers} rows={rows} />
      </div>
    );
  }

  const wrapperClass = [styles.wrapper, classNames?.tableWrapper ?? ''].filter(Boolean).join(' ');
  const tableClass = [styles.table, classNames?.table ?? ''].filter(Boolean).join(' ');
  const thClass = [styles.th, classNames?.tableHeaderCell ?? ''].filter(Boolean).join(' ');
  const trClass = [styles.tr, classNames?.tableRow ?? ''].filter(Boolean).join(' ');
  const tdClass = [styles.td, classNames?.tableCell ?? ''].filter(Boolean).join(' ');
  const theadClass = classNames?.tableHead ?? '';
  const tbodyClass = classNames?.tableBody ?? '';

  return (
    <div className={wrapperClass}>
      <table className={tableClass}>
        <thead className={theadClass || undefined}>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className={thClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tbodyClass || undefined}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={trClass}>
              {headers.map((_, colIndex) => (
                <td key={colIndex} className={tdClass}>
                  {row[colIndex] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
