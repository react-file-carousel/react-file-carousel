import { useRef, useEffect, useCallback, useState } from 'react';
import {
  FileText,
  FileJson,
  FileSpreadsheet,
  FileCode,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Grid2x2,
  List,
} from 'lucide-react';
import type { CarouselBarProps, FileType } from '../types';
import styles from './CarouselBar.module.css';

const ICON_SIZE = 24;
const SCROLL_AMOUNT = 200;
const DEFAULT_EXPANDED_HEIGHT = 160;
const DEFAULT_EXPANDED_WIDTH = 180;
const MIN_EXPANDED_HEIGHT = 60;
const MIN_EXPANDED_WIDTH = 80;

const defaultFileIcons: Record<FileType, typeof FileText> = {
  csv: FileSpreadsheet,
  json: FileJson,
  text: FileText,
  yaml: FileCode,
  xml: FileCode,
  markdown: FileText,
  log: FileText,
  tsv: FileSpreadsheet,
};

/** Truncate filename with "..." in the middle, OS-style (e.g. "very_long_fi...ame.txt"). */
function truncateMiddle(name: string, maxLen: number): string {
  if (name.length <= maxLen) return name;
  const half = Math.floor((maxLen - 3) / 2);
  const start = name.slice(0, half);
  const end = name.slice(-(maxLen - 3 - half));
  return `${start}...${end}`;
}

export function CarouselBar({
  files,
  activeId,
  onSelect,
  position = 'top',
  expanded = false,
  onExpandedChange,
  fileIcons: customIcons,
  classNames,
  components,
}: CarouselBarProps) {
  const isVertical = position === 'left' || position === 'right';
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [expandedSize, setExpandedSize] = useState(() =>
    isVertical ? DEFAULT_EXPANDED_WIDTH : DEFAULT_EXPANDED_HEIGHT
  );
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef({ startPos: 0, startSize: 0 });

  // Reset expanded size when orientation changes
  useEffect(() => {
    setExpandedSize(isVertical ? DEFAULT_EXPANDED_WIDTH : DEFAULT_EXPANDED_HEIGHT);
  }, [isVertical]);

  const updateArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (isVertical) {
      setShowStart(el.scrollTop > 0);
      setShowEnd(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    } else {
      setShowStart(el.scrollLeft > 0);
      setShowEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  }, [isVertical]);

  const scrollActiveIntoView = useCallback(() => {
    if (activeRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeRef.current;

      if (isVertical) {
        const top = button.offsetTop - container.offsetTop;
        const bottom = top + button.offsetHeight;

        if (top < container.scrollTop) {
          container.scrollTo({ top: top - 8, behavior: 'smooth' });
        } else if (bottom > container.scrollTop + container.clientHeight) {
          container.scrollTo({
            top: bottom - container.clientHeight + 8,
            behavior: 'smooth',
          });
        }
      } else {
        const left = button.offsetLeft - container.offsetLeft;
        const right = left + button.offsetWidth;

        if (left < container.scrollLeft) {
          container.scrollTo({ left: left - 8, behavior: 'smooth' });
        } else if (right > container.scrollLeft + container.clientWidth) {
          container.scrollTo({
            left: right - container.clientWidth + 8,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [isVertical]);

  useEffect(() => {
    scrollActiveIntoView();
  }, [activeId, scrollActiveIntoView]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });

    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      resizeRef.current = {
        startPos: isVertical ? e.clientX : e.clientY,
        startSize: expandedSize,
      };
      setIsResizing(true);

      const handleMove = (ev: MouseEvent) => {
        const currentPos = isVertical ? ev.clientX : ev.clientY;
        const delta =
          position === 'top' || position === 'left'
            ? currentPos - resizeRef.current.startPos
            : resizeRef.current.startPos - currentPos;
        const minSize = isVertical ? MIN_EXPANDED_WIDTH : MIN_EXPANDED_HEIGHT;
        setExpandedSize(Math.max(minSize, resizeRef.current.startSize + delta));
      };

      const handleUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };

      document.body.style.userSelect = 'none';
      document.body.style.cursor = isVertical ? 'col-resize' : 'row-resize';
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    },
    [isVertical, position, expandedSize]
  );

  const scrollBy = (direction: 'start' | 'end') => {
    const amount = direction === 'start' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    if (isVertical) {
      scrollContainerRef.current?.scrollBy({ top: amount, behavior: 'smooth' });
    } else {
      scrollContainerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const el = scrollContainerRef.current;
      if (!el) return;
      if (expanded) {
        if (isVertical) {
          const canScrollV = el.scrollHeight > el.clientHeight;
          const canScrollH = el.scrollWidth > el.clientWidth;
          if (canScrollV) el.scrollTop += e.deltaY;
          if (canScrollH) el.scrollLeft += e.deltaX;
          if (canScrollV || canScrollH) e.preventDefault();
        } else {
          const canScrollV = el.scrollHeight > el.clientHeight;
          if (canScrollV) {
            el.scrollTop += e.deltaY;
            e.preventDefault();
          }
        }
      } else {
        if (isVertical) {
          const canScroll = el.scrollHeight > el.clientHeight;
          if (canScroll) {
            el.scrollTop += e.deltaY + e.deltaX;
            e.preventDefault();
          }
        } else {
          const canScroll = el.scrollWidth > el.clientWidth;
          if (canScroll) {
            el.scrollLeft += e.deltaY + e.deltaX;
            e.preventDefault();
          }
        }
      }
    },
    [expanded, isVertical]
  );

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const barClasses = [
    styles.bar,
    isVertical && !expanded ? styles.barVertical : '',
    expanded ? styles.barExpanded : '',
    expanded && isVertical ? styles.barExpandedVertical : '',
    position === 'left' ? styles.borderRight : '',
    position === 'right' ? styles.borderLeft : '',
    position === 'bottom' ? styles.borderTop : '',
    classNames?.bar ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const barWrapperClasses = [
    styles.barWrapper,
    !expanded && isVertical ? styles.barWrapperVertical : '',
    expanded ? styles.barWrapperExpanded : '',
  ]
    .filter(Boolean)
    .join(' ');

  const barWrapperStyle: React.CSSProperties | undefined = expanded
    ? { [isVertical ? 'width' : 'height']: expandedSize }
    : undefined;

  const StartArrow = isVertical ? ChevronUp : ChevronLeft;
  const EndArrow = isVertical ? ChevronDown : ChevronRight;
  const startArrowClass = `${styles.arrow} ${isVertical ? styles.arrowTop : styles.arrowLeft}`;
  const endArrowClass = `${styles.arrow} ${isVertical ? styles.arrowBottom : styles.arrowRight}`;
  const startLabel = isVertical ? 'Scroll up' : 'Scroll left';
  const endLabel = isVertical ? 'Scroll down' : 'Scroll right';

  const resizeHandleClass = (() => {
    switch (position) {
      case 'top':
        return styles.resizeHandleBottom;
      case 'bottom':
        return styles.resizeHandleTop;
      case 'left':
        return styles.resizeHandleRight;
      case 'right':
        return styles.resizeHandleLeft;
    }
  })();

  return (
    <div className={barWrapperClasses} style={barWrapperStyle}>
      {!expanded && showStart && (
        <button
          className={startArrowClass}
          onClick={() => scrollBy('start')}
          aria-label={startLabel}
          tabIndex={-1}
        >
          <StartArrow size={16} />
        </button>
      )}
      <div className={barClasses} ref={scrollContainerRef} role="tablist">
        {files.map((file) => {
          const isActive = file.id === activeId;
          const Icon = customIcons?.[file.type] ?? defaultFileIcons[file.type] ?? FileText;

          const nameMaxLen = expanded ? 20 : 14;
          const displayName = file.name.length > nameMaxLen ? truncateMiddle(file.name, nameMaxLen) : file.name;

          const iconEl = (
            <span className={`${styles.iconWrap} ${classNames?.iconWrap ?? ''}`.trim()}>
              <Icon size={ICON_SIZE} className={`${styles.icon} ${classNames?.icon ?? ''}`.trim()} />
            </span>
          );
          const nameEl = (
            <span className={`${styles.name} ${classNames?.name ?? ''}`.trim()} title={file.name}>
              {displayName}
            </span>
          );

          const tabClass = [
            styles.tab,
            isActive ? styles.active : '',
            isActive ? classNames?.tabActive ?? '' : '',
            classNames?.tab ?? '',
          ]
            .filter(Boolean)
            .join(' ');

          if (components?.Tab) {
            const CustomTab = components.Tab;
            return (
              <CustomTab
                key={file.id}
                file={file}
                active={isActive}
                onSelect={() => onSelect(file.id)}
                icon={iconEl}
                name={nameEl}
                ref={isActive ? activeRef : undefined}
              />
            );
          }

          return (
            <button
              key={file.id}
              ref={isActive ? activeRef : undefined}
              role="tab"
              aria-selected={isActive}
              className={tabClass}
              onClick={() => onSelect(file.id)}
            >
              {iconEl}
              {nameEl}
            </button>
          );
        })}
      </div>
      {!expanded && showEnd && (
        <button
          className={endArrowClass}
          onClick={() => scrollBy('end')}
          aria-label={endLabel}
          tabIndex={-1}
        >
          <EndArrow size={16} />
        </button>
      )}
      {onExpandedChange && (
        <button
          className={styles.toggleButton}
          onClick={() => onExpandedChange(!expanded)}
          aria-label={expanded ? 'Collapse to single row' : 'Expand to grid'}
          tabIndex={-1}
        >
          {expanded ? <List size={14} /> : <Grid2x2 size={14} />}
        </button>
      )}
      {expanded && (
        <div
          className={`${styles.resizeHandle} ${resizeHandleClass} ${isResizing ? styles.resizeHandleActive : ''}`}
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}
