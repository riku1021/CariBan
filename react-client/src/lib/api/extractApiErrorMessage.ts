import axios, { type AxiosError } from "axios";

type FastApiDetailItem = {
  loc?: (string | number)[];
  msg: string;
  type?: string;
};

type FastApiErrorBody = {
  detail?: string | FastApiDetailItem[];
  error?: {
    message?: string;
  };
};

/**
 * FastAPI 標準の 422 `detail`、HTTPException の `detail` 文字列、
 * カスタム `{ error: { message } }` を読み、ユーザー向け文字列にまとめる。
 */
export function extractApiErrorMessage(
  error: AxiosError<FastApiErrorBody> | Error,
  fallback = "リクエストに失敗しました"
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      if ("detail" in data) {
        const text = formatFastApiDetail(data.detail);
        if (text) return text;
      }
      const err = data.error;
      if (err && typeof err.message === "string" && err.message.length > 0) {
        return err.message;
      }
    }
    if (typeof error.message === "string" && error.message.length > 0) {
      return error.message;
    }
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

function formatFastApiDetail(detail: FastApiErrorBody["detail"]): string {
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    if (detail.length === 0) {
      return "";
    }
    return detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          const path = item.loc
            ? item.loc
                .filter(
                  (segment) => segment !== "body" && segment !== "query" && segment !== "path"
                )
                .map((segment) => String(segment))
                .join(" › ")
            : "";
          return path ? `${path}: ${item.msg}` : item.msg;
        }
        return String(item);
      })
      .filter(Boolean)
      .join(" / ");
  }
  return "";
}
