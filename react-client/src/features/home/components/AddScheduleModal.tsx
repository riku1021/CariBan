import { useSetAtom } from "jotai";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { FormModal } from "@/components/FormModal";
import { button } from "@/styles/objects/button";

import { createSchedule } from "../api/createEntryApi";
import { addedCalendarEventsAtom, addedSelectionsAtom } from "../atoms/entriesAtoms";
import { useCompanyOptionsQuery } from "../hooks/useCompanyOptionsQuery";
import { CALENDAR_EVENT_KINDS, type CalendarEventKind, EVENT_KIND_LABELS } from "../types";
import * as styles from "./AddEntryForm.styles";

type AddScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
  /** 指定時は種別を固定し、種別セレクトを非表示にする */
  fixedKind?: CalendarEventKind;
};

const DEFAULT_KIND: CalendarEventKind = "interview";

/** 選考フローに紐づきやすい予定種別 */
const STAGE_RELATED_KINDS: CalendarEventKind[] = ["esDeadline", "interview", "webTest"];

const MODAL_TITLES: Partial<Record<CalendarEventKind, string>> = {
  interview: "面接を追加",
};

const MODAL_HINTS: Partial<Record<CalendarEventKind, string>> = {
  interview: "面接の日時を登録します。カレンダーと直近の選考予定に反映されます。",
};

export function AddScheduleModal({ isOpen, onClose, onCreated, fixedKind }: AddScheduleModalProps) {
  const setAddedSelections = useSetAtom(addedSelectionsAtom);
  const setAddedCalendarEvents = useSetAtom(addedCalendarEventsAtom);
  const { data: companies = [], isPending: isCompaniesPending } = useCompanyOptionsQuery();

  const [kind, setKind] = useState<CalendarEventKind>(DEFAULT_KIND);
  const [title, setTitle] = useState(EVENT_KIND_LABELS[DEFAULT_KIND]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [companyId, setCompanyId] = useState("");
  const [stageId, setStageId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialKind = fixedKind ?? DEFAULT_KIND;
  const fieldPrefix = fixedKind ? `schedule-${fixedKind}` : "schedule";
  const modalTitle = fixedKind ? (MODAL_TITLES[fixedKind] ?? "予定を追加") : "予定を追加";
  const modalHint = fixedKind
    ? (MODAL_HINTS[fixedKind] ??
      "予定はカレンダーに載る確定枠です。自分の作業は「タスク」から追加してください。")
    : "予定はカレンダーに載る確定枠です（面接・説明会・Webテスト実施など）。自分の作業は「タスク」から追加してください。";

  const selectedCompany = companies.find((company) => company.id === companyId);
  const showStage =
    STAGE_RELATED_KINDS.includes(kind) &&
    Boolean(selectedCompany && selectedCompany.stages.length > 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setKind(initialKind);
    setTitle(EVENT_KIND_LABELS[initialKind]);
    setDate("");
    setStartTime("10:00");
    setEndTime("11:00");
    setCompanyId("");
    setStageId("");
    setErrorMessage("");
    setIsSubmitting(false);
  }, [isOpen, initialKind]);

  const handleKindChange = (nextKind: CalendarEventKind) => {
    if (fixedKind) {
      return;
    }
    setKind(nextKind);
    setTitle(EVENT_KIND_LABELS[nextKind]);
    if (!STAGE_RELATED_KINDS.includes(nextKind)) {
      setStageId("");
    }
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
    if (!date) {
      setErrorMessage("日付を選択してください");
      return;
    }
    if (!companyId || !selectedCompany) {
      setErrorMessage("企業を選択してください");
      return;
    }
    if (startTime && endTime && startTime >= endTime) {
      setErrorMessage("終了時刻は開始時刻より後にしてください");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createSchedule({
        kind: fixedKind ?? kind,
        title: title.trim(),
        date,
        startTime,
        endTime,
        companyId,
        companyName: selectedCompany.name,
        stageId: stageId || null,
      });
      setAddedSelections((current) => [created.selection, ...current]);
      setAddedCalendarEvents((current) => [
        { date: created.calendarDate, kind: created.selection.kind },
        ...current,
      ]);
      onCreated?.();
      onClose();
    } catch {
      setErrorMessage("予定の追加に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.hint}>{modalHint}</p>

        {fixedKind ? null : (
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${fieldPrefix}-kind`}>
              種別
            </label>
            <select
              id={`${fieldPrefix}-kind`}
              className={styles.select}
              value={kind}
              onChange={(event) => handleKindChange(event.target.value as CalendarEventKind)}
              required
            >
              {CALENDAR_EVENT_KINDS.map((eventKind) => (
                <option key={eventKind} value={eventKind}>
                  {EVENT_KIND_LABELS[eventKind]}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldPrefix}-title`}>
            タイトル
          </label>
          <input
            id={`${fieldPrefix}-title`}
            className={styles.input}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldPrefix}-date`}>
            日付
          </label>
          <input
            id={`${fieldPrefix}-date`}
            className={styles.input}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className={styles.timeRow}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${fieldPrefix}-start-time`}>
              開始
            </label>
            <input
              id={`${fieldPrefix}-start-time`}
              className={styles.input}
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${fieldPrefix}-end-time`}>
              終了
            </label>
            <input
              id={`${fieldPrefix}-end-time`}
              className={styles.input}
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldPrefix}-company`}>
            企業
          </label>
          <select
            id={`${fieldPrefix}-company`}
            className={styles.select}
            value={companyId}
            onChange={(event) => handleCompanyChange(event.target.value)}
            required
            disabled={isCompaniesPending}
          >
            <option value="">選択してください</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {showStage ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${fieldPrefix}-stage`}>
              選考ステージ（任意）
            </label>
            <select
              id={`${fieldPrefix}-stage`}
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
