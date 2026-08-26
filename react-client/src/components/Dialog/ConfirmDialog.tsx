import type { FC } from "react";

import ConfirmAnimation from "@/animations/ConfirmAnimation";
import { BaseModal } from "@/components/AlertModal";
import { button } from "@/styles/objects/button";

import * as styles from "./Dialog.styles";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  title,
  text,
  confirmButtonText = "はい",
  cancelButtonText = "キャンセル",
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const buttonFooter = (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={button({ variant: "primary", size: "medium" })}
        onClick={handleConfirm}
      >
        {confirmButtonText}
      </button>
      <button
        type="button"
        className={button({ variant: "secondary", size: "medium" })}
        onClick={onClose}
      >
        {cancelButtonText}
      </button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      text={text}
      autoClose={false}
      role="alertdialog"
      footer={buttonFooter}
    >
      <ConfirmAnimation />
    </BaseModal>
  );
};
