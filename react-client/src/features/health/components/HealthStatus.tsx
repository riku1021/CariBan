import { extractApiErrorMessage } from "@/lib/api/extractApiErrorMessage";
import { css } from "@/styled-system/css";

import { useHealthQuery } from "../hooks/useHealthQuery";

export function HealthStatus() {
  const { data, isPending, isError, error, refetch, isFetching } = useHealthQuery();

  if (isPending) {
    return <p className={statusText}>API 接続を確認しています...</p>;
  }

  if (isError) {
    const message = extractApiErrorMessage(error);
    return (
      <div className={panel}>
        <p className={statusText}>バックエンドに接続できません</p>
        <p className={detailText}>{message}</p>
        <button type="button" className={retryButton} onClick={() => refetch()}>
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className={panel}>
      <p className={statusText}>
        API: {data.status}
        {isFetching ? "（更新中）" : ""}
      </p>
      <p className={detailText}>timestamp: {data.timestamp}</p>
    </div>
  );
}

const panel = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  padding: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  borderRadius: "8px",
  maxWidth: "420px",
  backgroundColor: "background.sub",
  color: "text.main",
});

const statusText = css({
  fontWeight: "bold",
  margin: "0",
  color: "text.main",
});

const detailText = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

const retryButton = css({
  alignSelf: "flex-start",
  paddingInline: "12px",
  paddingBlock: "8px",
  cursor: "pointer",
  backgroundColor: "brand.primary.main",
  color: "white",
  borderWidth: "0",
  borderRadius: "4px",
});
