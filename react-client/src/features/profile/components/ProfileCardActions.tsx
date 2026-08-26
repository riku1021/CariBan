import { MdEdit, MdOpenInFull } from "react-icons/md";

import * as layout from "./ProfilePage.styles";

type ProfileCardActionsProps = {
  showExpand?: boolean;
};

export function ProfileCardActions({ showExpand = false }: ProfileCardActionsProps) {
  return (
    <div className={layout.cardActions}>
      <button type="button" className={layout.cardIconButton} aria-label="編集">
        <MdEdit className={layout.cardIcon} aria-hidden="true" />
      </button>
      {showExpand ? (
        <button type="button" className={layout.cardIconButton} aria-label="全文を見る">
          <MdOpenInFull className={layout.cardIcon} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
