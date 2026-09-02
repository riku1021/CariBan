import { useState } from "react";
import { FaBuilding, FaCalendarPlus, FaComments, FaTasks } from "react-icons/fa";

import { SuccessModal } from "@/components/AlertModal";

import { AddCompanyModal } from "./AddCompanyModal";
import { AddScheduleModal } from "./AddScheduleModal";
import { AddTaskModal } from "./AddTaskModal";
import * as styles from "./HeaderEntryActions.styles";

export function HeaderEntryActions() {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successText, setSuccessText] = useState("");

  const handleCompanyCreated = () => {
    setSuccessText("企業を追加しました");
    setIsSuccessOpen(true);
  };

  const handleTaskCreated = () => {
    setSuccessText("タスクを追加しました");
    setIsSuccessOpen(true);
  };

  const handleInterviewCreated = () => {
    setSuccessText("面接を追加しました");
    setIsSuccessOpen(true);
  };

  const handleScheduleCreated = () => {
    setSuccessText("予定を追加しました");
    setIsSuccessOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="企業を追加"
        onClick={() => setIsCompanyOpen(true)}
      >
        <FaBuilding className={styles.icon} aria-hidden="true" />
        企業＋
      </button>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="タスクを追加"
        onClick={() => setIsTaskOpen(true)}
      >
        <FaTasks className={styles.icon} aria-hidden="true" />
        タスク＋
      </button>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="面接を追加"
        onClick={() => setIsInterviewOpen(true)}
      >
        <FaComments className={styles.icon} aria-hidden="true" />
        面接＋
      </button>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="予定を追加"
        onClick={() => setIsScheduleOpen(true)}
      >
        <FaCalendarPlus className={styles.icon} aria-hidden="true" />
        予定＋
      </button>

      <AddCompanyModal
        isOpen={isCompanyOpen}
        onClose={() => setIsCompanyOpen(false)}
        onCreated={handleCompanyCreated}
      />
      <AddTaskModal
        isOpen={isTaskOpen}
        onClose={() => setIsTaskOpen(false)}
        onCreated={handleTaskCreated}
      />
      <AddScheduleModal
        isOpen={isInterviewOpen}
        onClose={() => setIsInterviewOpen(false)}
        onCreated={handleInterviewCreated}
        fixedKind="interview"
      />
      <AddScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onCreated={handleScheduleCreated}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="追加完了"
        text={successText}
      />
    </>
  );
}
