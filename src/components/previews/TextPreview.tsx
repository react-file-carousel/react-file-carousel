import type { TextPreviewProps } from '../../types';
import styles from './TextPreview.module.css';

export function TextPreview({ content, classNames }: TextPreviewProps) {
  const preClass = [styles.pre, classNames?.pre ?? ''].filter(Boolean).join(' ');
  const codeClass = classNames?.code ?? '';
  return (
    <pre className={preClass}>
      <code className={codeClass || undefined}>{content}</code>
    </pre>
  );
}
