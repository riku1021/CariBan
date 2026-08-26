import type { FC, FormEvent } from "react";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import { cx } from "@/styled-system/css";
import { button } from "@/styles/objects/button";

import * as styles from "./ContactPage.styles";

export const ContactPage: FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentWrapper}>
        {formSubmitted ? (
          <div className={styles.thankYouMessage} role="status">
            <h2 className={styles.thankYouHeading}>お問い合わせありがとうございます</h2>
            <p className={styles.thankYouBody}>
              メッセージを受け付けました。担当者からの返信をお待ちください。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <div className={styles.nameFields}>
                <div className={styles.nameField}>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={styles.floatingInput}
                    placeholder=" "
                    required
                    autoComplete="family-name"
                  />
                  <label htmlFor="lastName" className={styles.floatingLabel}>
                    姓
                  </label>
                </div>
                <div className={styles.nameField}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={styles.floatingInput}
                    placeholder=" "
                    required
                    autoComplete="given-name"
                  />
                  <label htmlFor="firstName" className={styles.floatingLabel}>
                    名
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="company"
                name="company"
                className={styles.floatingInput}
                placeholder=" "
                autoComplete="organization"
              />
              <label htmlFor="company" className={styles.floatingLabel}>
                会社名
              </label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.floatingInput}
                placeholder=" "
                required
                autoComplete="email"
              />
              <label htmlFor="email" className={styles.floatingLabel}>
                メールアドレス
              </label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="subject"
                name="subject"
                className={styles.floatingInput}
                placeholder=" "
                required
              />
              <label htmlFor="subject" className={styles.floatingLabel}>
                件名
              </label>
            </div>

            <div className={styles.formGroup}>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={styles.floatingTextarea}
                placeholder=" "
                required
              />
              <label htmlFor="message" className={cx(styles.floatingLabel, styles.textareaLabel)}>
                お問い合わせ内容
              </label>
            </div>

            <div className={styles.submitButtonWrapper}>
              <button
                type="submit"
                className={cx(button({ variant: "primary" }), styles.submitButton)}
              >
                <BsFillSendFill className={styles.sendIcon} />
                送信する
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
