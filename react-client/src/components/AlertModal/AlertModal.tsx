import type { FC } from "react";

import CheckAnimation from "@/animations/CheckAnimation";
import ErrorAnimation from "@/animations/ErrorAnimation";

import * as styles from "./AlertModal.styles";
import { BaseModal } from "./BaseModal";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  duration?: number;
};

export const SuccessModal: FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  duration = 2000,
}) => {
  const progressBarFooter = (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarStyle} style={{ animationDuration: `${duration}ms` }} />
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      text={text}
      duration={duration}
      autoClose={true}
      footer={progressBarFooter}
    >
      <CheckAnimation />
    </BaseModal>
  );
};

export const ErrorModal: FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  duration = 3000,
}) => {
  const progressBarFooter = (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarStyle} style={{ animationDuration: `${duration}ms` }} />
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      text={text}
      duration={duration}
      autoClose={true}
      footer={progressBarFooter}
    >
      <ErrorAnimation />
    </BaseModal>
  );
};
