import type { FC, MouseEvent, ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

import { useModalAnimation } from "@/hooks/useModalAnimation";
import { cx } from "@/styled-system/css";

import * as styles from "./FormModal.styles";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const FormModal: FC<FormModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const { visible, isClosing } = useModalAnimation({
    isOpen,
    onClose,
    autoClose: false,
  });

  if (!visible) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop dismiss
    <div
      className={cx(styles.overlay, isClosing ? styles.fadeOut : styles.fadeIn)}
      onClick={handleOverlayClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        className={cx(styles.panel, isClosing ? styles.contentFadeOut : styles.contentFadeIn)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
      >
        <button type="button" className={styles.closeIcon} onClick={onClose} aria-label="閉じる">
          <IoIosClose />
        </button>
        <h2 id="form-modal-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
};
