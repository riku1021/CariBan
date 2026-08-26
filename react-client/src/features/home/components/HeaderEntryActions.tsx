import { useState } from "react";
import { FaCalendarPlus, FaTasks } from "react-icons/fa";

import { SuccessModal } from "@/components/AlertModal";

import { AddScheduleModal } from "./AddScheduleModal";
import { AddTaskModal } from "./AddTaskModal";
import * as styles from "./HeaderEntryActions.styles";

export function HeaderEntryActions() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successText, setSuccessText] = useState("");

  const handleTaskCreated = () => {
    setSuccessText("タスクを追加しました");
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
        aria-label="タスクを追加"
        onClick={() => setIsTaskOpen(true)}
      >
        <FaTasks className={styles.icon} aria-hidden="true" />
        タスク＋
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

      <AddTaskModal
        isOpen={isTaskOpen}
        onClose={() => setIsTaskOpen(false)}
        onCreated={handleTaskCreated}
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
