import { useMemo } from 'react';
import type { JsonPreviewProps } from '../../types';
import styles from './JsonPreview.module.css';

type JsonToken =
  | { type: 'key'; value: string }
  | { type: 'string'; value: string }
  | { type: 'number'; value: string }
  | { type: 'boolean'; value: string }
  | { type: 'null'; value: string }
  | { type: 'punctuation'; value: string };

function tokenize(json: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  const regex =
    /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b)|(\bnull\b)|([{}[\]:,]|\n[ ]*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(json)) !== null) {
    if (match[1] !== undefined) {
      tokens.push({ type: 'key', value: match[1] });
      tokens.push({ type: 'punctuation', value: ':' });
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'string', value: match[2] });
    } else if (match[3] !== undefined) {
      tokens.push({ type: 'number', value: match[3] });
    } else if (match[4] !== undefined) {
      tokens.push({ type: 'boolean', value: match[4] });
    } else if (match[5] !== undefined) {
      tokens.push({ type: 'null', value: match[5] });
    } else if (match[6] !== undefined) {
      tokens.push({ type: 'punctuation', value: match[6] });
    }
  }

  return tokens;
}

export function JsonPreview({ content, indent = 2, classNames }: JsonPreviewProps) {
  const { tokens, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(content);
      const formatted = JSON.stringify(parsed, null, indent);
      return { tokens: tokenize(formatted), error: null };
    } catch (e) {
      return { tokens: [], error: (e as Error).message };
    }
  }, [content, indent]);

  if (error) {
    const errClass = [styles.error, classNames?.error ?? ''].filter(Boolean).join(' ');
    return <div className={errClass}>Invalid JSON: {error}</div>;
  }

  const preClass = [styles.pre, classNames?.pre ?? ''].filter(Boolean).join(' ');
  const codeClass = classNames?.code ?? '';

  return (
    <pre className={preClass}>
      <code className={codeClass || undefined}>
        {tokens.map((token, i) => {
          if (token.type === 'punctuation') {
            return token.value === '\n' ? '\n' : token.value === ':' ? ': ' : token.value;
          }
          return (
            <span key={i} className={styles[token.type]}>
              {token.value}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
