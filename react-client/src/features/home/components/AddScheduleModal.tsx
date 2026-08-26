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
};

const DEFAULT_KIND: CalendarEventKind = "interview";

/** 選考フローに紐づきやすい予定種別 */
const STAGE_RELATED_KINDS: CalendarEventKind[] = ["esDeadline", "interview", "webTest"];

export function AddScheduleModal({ isOpen, onClose, onCreated }: AddScheduleModalProps) {
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

  const selectedCompany = companies.find((company) => company.id === companyId);
  const showStage =
    STAGE_RELATED_KINDS.includes(kind) &&
    Boolean(selectedCompany && selectedCompany.stages.length > 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setKind(DEFAULT_KIND);
    setTitle(EVENT_KIND_LABELS[DEFAULT_KIND]);
    setDate("");
    setStartTime("10:00");
    setEndTime("11:00");
    setCompanyId("");
    setStageId("");
    setErrorMessage("");
    setIsSubmitting(false);
  }, [isOpen]);

  const handleKindChange = (nextKind: CalendarEventKind) => {
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
        kind,
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
    <FormModal isOpen={isOpen} onClose={onClose} title="予定を追加">
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.hint}>
          予定はカレンダーに載る確定枠です（面接・説明会・Webテスト実施など）。自分の作業は「タスク」から追加してください。
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="schedule-kind">
            種別
          </label>
          <select
            id="schedule-kind"
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

        <div className={styles.field}>
          <label className={styles.label} htmlFor="schedule-title">
            タイトル
          </label>
          <input
            id="schedule-title"
            className={styles.input}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="schedule-date">
            日付
          </label>
          <input
            id="schedule-date"
            className={styles.input}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className={styles.timeRow}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="schedule-start-time">
              開始
            </label>
            <input
              id="schedule-start-time"
              className={styles.input}
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="schedule-end-time">
              終了
            </label>
            <input
              id="schedule-end-time"
              className={styles.input}
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="schedule-company">
            企業
          </label>
          <select
            id="schedule-company"
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
            <label className={styles.label} htmlFor="schedule-stage">
              選考ステージ（任意）
            </label>
            <select
              id="schedule-stage"
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
