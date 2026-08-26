import type { FC } from "react";
import { useState } from "react";

import { ErrorModal, SuccessModal } from "@/components/AlertModal";
import { ConfirmDialog, LoadingDialog } from "@/components/Dialog";
import { button } from "@/styles/objects/button";

import * as styles from "./AlertPage.styles";

export const AlertPage: FC = () => {
  const [infoResult, setInfoResult] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);

  const handleSuccessAlert = () => {
    setIsSuccessModalOpen(true);
  };

  const handleErrorAlert = () => {
    setIsErrorModalOpen(true);
  };

  const handleConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    setInfoResult("操作が確認されました");
  };

  const handleLoadingDialog = () => {
    setIsLoadingDialogOpen(true);
    window.setTimeout(() => {
      setIsLoadingDialogOpen(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>アラートテスト</h1>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={button({ variant: "primary", size: "medium" })}
          onClick={handleSuccessAlert}
        >
          成功アラート
        </button>
        <button
          type="button"
          className={button({ variant: "primary", size: "medium" })}
          onClick={handleErrorAlert}
        >
          エラーアラート
        </button>
        <button
          type="button"
          className={button({ variant: "secondary", size: "medium" })}
          onClick={handleConfirmDialog}
        >
          確認ダイアログ
        </button>
        <button
          type="button"
          className={button({ variant: "primary", size: "medium" })}
          onClick={handleLoadingDialog}
        >
          ローディングダイアログ
        </button>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="成功"
        text="操作が完了しました"
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="エラー"
        text="エラーが発生しました"
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        title="確認"
        text="この操作を実行しますか？"
        confirmButtonText="実行する"
        cancelButtonText="キャンセル"
        onConfirm={handleConfirm}
      />
      <LoadingDialog
        isOpen={isLoadingDialogOpen}
        onClose={() => setIsLoadingDialogOpen(false)}
        title="処理中..."
        text="データを読み込んでいます"
      />
      {infoResult ? (
        <div className={styles.result}>
          <h3>結果:</h3>
          <p>{infoResult}</p>
        </div>
      ) : null}
    </div>
  );
};
