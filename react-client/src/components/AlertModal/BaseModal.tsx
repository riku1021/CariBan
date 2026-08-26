import type { FC, MouseEvent, ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

import { useModalAnimation } from "@/hooks/useModalAnimation";
import { cx } from "@/styled-system/css";

import * as styles from "./AlertModal.styles";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  duration?: number;
  autoClose?: boolean;
  dismissible?: boolean;
  role?: "dialog" | "alertdialog";
  children?: ReactNode;
  footer?: ReactNode;
};

export const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  duration = 2000,
  autoClose = true,
  dismissible = true,
  role = "dialog",
  children,
  footer,
}) => {
  const { visible, isClosing } = useModalAnimation({
    isOpen,
    onClose,
    duration,
    autoClose,
  });

  if (!visible) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const overlayClassName = cx(styles.modalOverlay, isClosing ? styles.fadeOut : styles.fadeIn);

  // role は dialog | alertdialog。動的指定だと Biome が aria-modal を非対応と判定する
  const panel = (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: role is dialog or alertdialog
    <div
      className={cx(styles.modalContent, isClosing ? styles.contentFadeOut : styles.contentFadeIn)}
      role={role}
      aria-modal="true"
      aria-labelledby="alert-modal-title"
    >
      {dismissible ? (
        <button type="button" className={styles.closeIcon} onClick={onClose} aria-label="閉じる">
          <IoIosClose />
        </button>
      ) : null}

      {children ? <div className={styles.animationContainer}>{children}</div> : null}

      <h2 id="alert-modal-title" className={styles.modalTitle}>
        {title}
      </h2>

      {text ? <div className={styles.modalBody}>{text}</div> : null}

      {footer ? <div className={styles.modalFooter}>{footer}</div> : null}
    </div>
  );

  if (!dismissible) {
    return (
      <div className={overlayClassName} role="presentation">
        {panel}
      </div>
    );
  }

  return (
    // オーバーレイクリックで閉じるためのコンテナ。本体の role は dialog / alertdialog。
    // biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop dismiss
    <div
      className={overlayClassName}
      onClick={handleOverlayClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
      role="presentation"
    >
      {panel}
    </div>
  );
};
