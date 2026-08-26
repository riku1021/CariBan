import { useSetAtom } from "jotai";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { FormModal } from "@/components/FormModal";
import { button } from "@/styles/objects/button";

import { createCompany } from "../api/createEntryApi";
import { addedCompaniesAtom } from "../atoms/entriesAtoms";
import {
  COMPANY_JOB_TITLES,
  type CompanyJobTitle,
  SELECTION_STAGES,
  type SelectionStageId,
} from "../types";
import * as styles from "./AddEntryForm.styles";

type AddCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const DEFAULT_JOB_TITLE: CompanyJobTitle = "バックエンド";
const DEFAULT_STAGE_ID: SelectionStageId = "entry";

export function AddCompanyModal({ isOpen, onClose, onCreated }: AddCompanyModalProps) {
  const setAddedCompanies = useSetAtom(addedCompaniesAtom);

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState<CompanyJobTitle>(DEFAULT_JOB_TITLE);
  const [currentStageId, setCurrentStageId] = useState<SelectionStageId>(DEFAULT_STAGE_ID);
  const [appliedDate, setAppliedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setName("");
    setJobTitle(DEFAULT_JOB_TITLE);
    setCurrentStageId(DEFAULT_STAGE_ID);
    setAppliedDate("");
    setErrorMessage("");
    setIsSubmitting(false);
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("企業名を入力してください");
      return;
    }
    if (!appliedDate) {
      setErrorMessage("応募日を選択してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createCompany({
        name: name.trim(),
        jobTitle,
        currentStageId,
        appliedDate,
      });
      setAddedCompanies((current) => [created, ...current]);
      onCreated?.();
      onClose();
    } catch {
      setErrorMessage("企業の追加に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} title="企業を追加">
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.hint}>
          選考中の企業を登録します。登録後、タスクや予定の企業選択から選べます。
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-name">
            企業名
          </label>
          <input
            id="company-name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="organization"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-job-title">
            職種
          </label>
          <select
            id="company-job-title"
            className={styles.select}
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value as CompanyJobTitle)}
            required
          >
            {COMPANY_JOB_TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-stage">
            現在の選考ステージ
          </label>
          <select
            id="company-stage"
            className={styles.select}
            value={currentStageId}
            onChange={(event) => setCurrentStageId(event.target.value as SelectionStageId)}
            required
          >
            {SELECTION_STAGES.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-applied-date">
            応募日
          </label>
          <input
            id="company-applied-date"
            className={styles.input}
            type="date"
            value={appliedDate}
            onChange={(event) => setAppliedDate(event.target.value)}
            required
          />
        </div>

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
