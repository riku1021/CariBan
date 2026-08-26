import { useSetAtom } from "jotai";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { FormModal } from "@/components/FormModal";
import { button } from "@/styles/objects/button";

import { createTask } from "../api/createEntryApi";
import { addedTasksAtom } from "../atoms/entriesAtoms";
import { useCompanyOptionsQuery } from "../hooks/useCompanyOptionsQuery";
import { TASK_KIND_LABELS, TASK_KINDS, type TaskKind } from "../types";
import * as styles from "./AddEntryForm.styles";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const DEFAULT_KIND: TaskKind = "submission";

export function AddTaskModal({ isOpen, onClose, onCreated }: AddTaskModalProps) {
  const setAddedTasks = useSetAtom(addedTasksAtom);
  const { data: companies = [], isPending: isCompaniesPending } = useCompanyOptionsQuery();

  const [kind, setKind] = useState<TaskKind>(DEFAULT_KIND);
  const [title, setTitle] = useState(TASK_KIND_LABELS[DEFAULT_KIND]);
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [stageId, setStageId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCompany = companies.find((company) => company.id === companyId);
  const showStage = Boolean(selectedCompany && selectedCompany.stages.length > 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setKind(DEFAULT_KIND);
    setTitle(TASK_KIND_LABELS[DEFAULT_KIND]);
    setDueDate("");
    setTime("");
    setCompanyId("");
    setStageId("");
    setErrorMessage("");
    setIsSubmitting(false);
  }, [isOpen]);

  const handleKindChange = (nextKind: TaskKind) => {
    setKind(nextKind);
    setTitle(TASK_KIND_LABELS[nextKind]);
  };

  const handleCompanyChange = (nextCompanyId: string) => {
    setCompanyId(nextCompanyId);
    setStageId("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("タイトルを入力してください");
      return;
    }
    if (!dueDate) {
      setErrorMessage("期限日を選択してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createTask({
        kind,
        title: title.trim(),
        dueDate,
        time: time || null,
        companyId: companyId || null,
        companyName: selectedCompany?.name ?? "",
        stageId: stageId || null,
      });
      setAddedTasks((current) => [created, ...current]);
      onCreated?.();
      onClose();
    } catch {
      setErrorMessage("タスクの追加に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} title="タスクを追加">
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.hint}>
          タスクは自分で完了する作業です（提出物・対策など）。相手との確定枠は「予定」から追加してください。
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-kind">
            種別
          </label>
          <select
            id="task-kind"
            className={styles.select}
            value={kind}
            onChange={(event) => handleKindChange(event.target.value as TaskKind)}
            required
          >
            {TASK_KINDS.map((taskKind) => (
              <option key={taskKind} value={taskKind}>
                {TASK_KIND_LABELS[taskKind]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-title">
            タイトル
          </label>
          <input
            id="task-title"
            className={styles.input}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-due-date">
            期限日
          </label>
          <input
            id="task-due-date"
            className={styles.input}
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-time">
            目安時刻（任意）
          </label>
          <input
            id="task-time"
            className={styles.input}
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-company">
            企業（任意）
          </label>
          <select
            id="task-company"
            className={styles.select}
            value={companyId}
            onChange={(event) => handleCompanyChange(event.target.value)}
            disabled={isCompaniesPending}
          >
            <option value="">選択しない</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {showStage ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-stage">
              選考ステージ（任意）
            </label>
            <select
              id="task-stage"
              className={styles.select}
              value={stageId}
              onChange={(event) => setStageId(event.target.value)}
            >
              <option value="">選択しない</option>
              {selectedCompany?.stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {errorMessage ? (
          <p className={styles.statusMessage} role="status">
            {errorMessage}
          </p>
        ) : null}

        <div className={styles.actions}>
          <button
            type="button"
            className={button({ variant: "secondary", size: "medium" })}
            onClick={onClose}
            disabled={isSubmitting}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className={button({ variant: "primary", size: "medium" })}
            disabled={isSubmitting}
          >
            {isSubmitting ? "追加中..." : "追加する"}
          </button>
        </div>
      </form>
    </FormModal>
  );
}
