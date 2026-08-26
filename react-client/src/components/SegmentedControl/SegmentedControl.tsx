import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

import * as styles from "./SegmentedControl.styles";

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: ReactNode;
};

type SegmentedControlProps<T extends string> = {
  value: T;
  options: readonly SegmentedControlOption<T>[];
  onChange: (value: T) => void;
  "aria-label": string;
};

type IndicatorRect = {
  left: number;
  width: number;
};

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<T, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<IndicatorRect>({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) {
      return;
    }

    const updateIndicator = () => {
      const activeButton = itemRefs.current.get(value);
      if (!activeButton) {
        return;
      }
      setIndicator({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(rootElement);
    for (const button of itemRefs.current.values()) {
      resizeObserver.observe(button);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [value]);

  return (
    <div ref={rootRef} className={styles.root} role="tablist" aria-label={ariaLabel}>
      <span
        className={styles.indicator}
        aria-hidden="true"
        style={{
          width: `${indicator.width}px`,
          transform: `translateX(${indicator.left}px)`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          ref={(element) => {
            if (element) {
              itemRefs.current.set(option.value, element);
              return;
            }
            itemRefs.current.delete(option.value);
          }}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={styles.item({ active: value === option.value })}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
