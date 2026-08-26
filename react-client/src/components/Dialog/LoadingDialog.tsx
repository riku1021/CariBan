import type { FC } from "react";

import LoadingAnimation from "@/animations/LoadingAnimation";
import { BaseModal } from "@/components/AlertModal";

import * as styles from "./Dialog.styles";

type LoadingDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
};

const noopClose = () => {
  return;
};

export const LoadingDialog: FC<LoadingDialogProps> = ({
  isOpen,
  onClose,
  title = "処理中...",
  text = "しばらくお待ちください",
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose ?? noopClose}
      title={title}
      text={text}
      autoClose={false}
      dismissible={false}
    >
      <div className={styles.loadingContainer}>
        <LoadingAnimation />
      </div>
    </BaseModal>
  );
};
