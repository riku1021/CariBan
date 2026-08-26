import type { ChangeEvent } from "react";

import * as styles from "./CompletionCheckbox.styles";

type CompletionCheckboxProps = {
  checked: boolean;
  /** 指定時は操作可能なチェックボックスになる */
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
};

export function CompletionCheckbox({
  checked,
  onCheckedChange,
  "aria-label": ariaLabel,
}: CompletionCheckboxProps) {
  const face = (
    <span className={styles.face({ completed: checked })} aria-hidden="true">
      ✓
    </span>
  );

  if (!onCheckedChange) {
    return face;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onCheckedChange(event.target.checked);
  };

  return (
    <label className={styles.control}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        onClick={(event) => event.stopPropagation()}
        aria-label={ariaLabel}
      />
      {face}
    </label>
  );
}
