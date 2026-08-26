import type { ProfileData } from "../types";

export const profileMock: ProfileData = {
  basic: {
    initials: "石",
    name: "石川 陸",
    school: "大阪国際工科専門職大学",
    major: "情報工学科 AI戦略コース",
    graduation: "27卒",
    bio: "長期インターンと個人開発を通じて、課題の整理から実装・運用まで一貫して取り組んできました。就活では技術と事業の両面から価値を出せるエンジニアを目指しています。",
  },
  completeness: {
    percent: 85,
  },
  materials: [
    {
      id: "axis",
      kind: "list",
      label: "就活の軸",
      items: [
        "ユーザー価値に直結するプロダクト開発に関われること",
        "技術選定や設計の議論に参加できること",
        "成長速度が速く、フィードバックが循環する環境であること",
      ],
    },
    {
      id: "pr",
      kind: "text",
      label: "自己PR",
      body: "曖昧な課題を分解し、優先度を付けて小さく検証する姿勢が強みです。インターンでは障害対応の手順を整理し、再発防止まで含めた改善を提案しました。",
    },
    {
      id: "gakuchika",
      kind: "gakuchika",
      label: "ガクチカ",
      title: "長期インターンでの開発改善",
      body: "週3日のインターンで、採用管理画面のレスポンス改善とテスト追加を担当しました。ボトルネックを計測し、クエリとキャッシュの見直しを進めました。",
      outcome: "主要画面の表示を約40%短縮し、障害報告の再発をゼロにしました。",
      tags: ["React", "FastAPI", "PostgreSQL"],
    },
    {
      id: "traits",
      kind: "traits",
      label: "強み・弱み",
      strengths:
        "曖昧な課題を分解し、優先度を付けて小さく検証しながら期限内に成果を出すことが強みです。",
      weaknesses:
        "細部まで詰めようとして抱え込みやすい点があり、早めの相談と完了条件の共有で改善しています。",
    },
  ],
  works: [
    {
      id: "work-1",
      title: "CariBan",
      description: "就活の選考・タスクを一覧できるダッシュボード",
    },
    {
      id: "work-2",
      title: "面接ログ共有アプリ",
      description: "面接メモをチームで振り返るための記録ツール",
    },
    {
      id: "work-3",
      title: "学習記録ボード",
      description: "資格対策の進捗と復習サイクルを可視化",
    },
  ],
  languages: [
    {
      id: "lang-1",
      name: "TypeScript",
      contexts: ["実務", "個人開発"],
      period: "3年",
      tone: "primary",
    },
    {
      id: "lang-2",
      name: "Go",
      contexts: ["個人開発"],
      period: "1.5年",
      tone: "secondary",
    },
    {
      id: "lang-3",
      name: "Python",
      contexts: ["実務"],
      period: "4年",
      tone: "accent",
    },
    {
      id: "lang-4",
      name: "SQL",
      contexts: ["実務", "個人開発"],
      period: "8ヶ月",
      tone: "warning",
    },
  ],
  education: [
    { id: "edu-1", period: "2017年4月", title: "〇〇県立〇〇中学校", event: "入学" },
    { id: "edu-2", period: "2020年3月", title: "〇〇県立〇〇中学校", event: "卒業" },
    { id: "edu-3", period: "2020年4月", title: "〇〇県立〇〇高等学校", event: "入学" },
    { id: "edu-4", period: "2023年3月", title: "〇〇県立〇〇高等学校", event: "卒業" },
    { id: "edu-5", period: "2023年4月", title: "大阪国際工科専門職大学", event: "入学" },
    { id: "edu-6", period: "2027年3月", title: "大阪国際工科専門職大学", event: "卒業見込み" },
  ],
  educationCurrentIndex: 4,
  activities: [
    {
      id: "act-1",
      title: "ハッカソン参加",
      tag: "チーム開発",
      date: "2024/08",
    },
    {
      id: "act-2",
      title: "技術書輪読会",
      tag: "勉強会",
      date: "2025/04",
    },
    {
      id: "act-3",
      title: "オープンキャンパス運営",
      tag: "運営",
      date: "2024/08",
    },
  ],
  certificates: [
    { id: "cert-1", name: "JDLA G検定", issuer: "JDLA", date: "2024/01" },
    { id: "cert-2", name: "GCI 2025 Winter", issuer: "東京大学", date: "2025" },
    { id: "cert-3", name: "Google関連修了証", issuer: "Coursera / Google", date: "2024/06" },
    { id: "cert-4", name: "AWS Certified Cloud Practitioner", issuer: "AWS", date: "2024/03" },
    { id: "cert-5", name: "基本情報技術者試験", issuer: "IPA", date: "2023/10" },
  ],
  awards: [
    { id: "award-1", name: "DeNA賞", category: "技術賞", date: "2024/03" },
    { id: "award-2", name: "ウィングアーク1st賞", category: "技術賞", date: "2024/08" },
    { id: "award-3", name: "優秀賞", category: "技術CAMP", date: "2023/11" },
  ],
};
