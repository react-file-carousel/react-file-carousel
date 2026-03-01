import { useState, useCallback } from 'react';
import type { FileCarouselProps } from '../types';
import { CarouselBar } from './CarouselBar';
import { PreviewPane } from './PreviewPane';
import styles from './FileCarousel.module.css';

export function FileCarousel({
  files,
  defaultActiveId,
  activeId: controlledActiveId,
  onActiveChange,
  className,
  jsonIndent,
  barPosition = 'top',
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  fileIcons,
  classNames,
  components,
}: FileCarouselProps) {
  const isControlled = controlledActiveId !== undefined;
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<string | number>(
    () => defaultActiveId ?? files[0]?.id ?? ''
  );

  const activeId = isControlled ? controlledActiveId : uncontrolledActiveId;

  const handleSelect = useCallback(
    (id: string | number) => {
      if (!isControlled) {
        setUncontrolledActiveId(id);
      }
      onActiveChange?.(id);
    },
    [isControlled, onActiveChange]
  );

  const isExpandedControlled = controlledExpanded !== undefined;
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded ?? false);
  const expanded = isExpandedControlled ? controlledExpanded : uncontrolledExpanded;

  const handleExpandedChange = useCallback(
    (value: boolean) => {
      if (!isExpandedControlled) {
        setUncontrolledExpanded(value);
      }
      onExpandedChange?.(value);
    },
    [isExpandedControlled, onExpandedChange]
  );

  const activeFile = files.find((f) => f.id === activeId);

  const isHorizontalLayout = barPosition === 'left' || barPosition === 'right';
  const barFirst = barPosition === 'top' || barPosition === 'left';

  const rootClasses = [
    styles.root,
    isHorizontalLayout ? styles.horizontal : '',
    className ?? '',
    classNames?.root ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (files.length === 0) {
    return (
      <div className={rootClasses}>
        <div className={styles.empty}>No files to display</div>
      </div>
    );
  }

  const bar = (
    <CarouselBar
      files={files}
      activeId={activeId}
      onSelect={handleSelect}
      position={barPosition}
      expanded={expanded}
      onExpandedChange={handleExpandedChange}
      fileIcons={fileIcons}
      classNames={classNames}
      components={components}
    />
  );

  const preview = activeFile ? (
    <PreviewPane
      file={activeFile}
      jsonIndent={jsonIndent}
      classNames={classNames}
      components={components}
    />
  ) : (
    <div className={styles.empty}>File not found</div>
  );

  return (
    <div className={rootClasses}>
      {barFirst ? (
        <>
          {bar}
          {preview}
        </>
      ) : (
        <>
          {preview}
          {bar}
        </>
      )}
    </div>
  );
}
