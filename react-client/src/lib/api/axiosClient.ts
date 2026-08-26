import axios from "axios";

/**
 * バックエンドサーバーとの通信を行う Axios インスタンス。
 * nginx 経由では VITE_API_BASE_URL=http://localhost（同一オリジン）を使う。
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
