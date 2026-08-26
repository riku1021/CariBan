export type ProfileBasic = {
  initials: string;
  name: string;
  bio: string;
};

export type ProfileCompleteness = {
  percent: number;
};

export type ProfileTextMaterial = {
  id: string;
  kind: "text";
  label: string;
  body: string;
};

export type ProfileListMaterial = {
  id: string;
  kind: "list";
  label: string;
  items: string[];
};

export type ProfileGakuchikaMaterial = {
  id: string;
  kind: "gakuchika";
  label: string;
  title: string;
  body: string;
  outcome: string;
  tags: string[];
};

export type ProfileTraitsMaterial = {
  id: string;
  kind: "traits";
  label: string;
  strengths: string;
  weaknesses: string;
};

export type ProfileMaterial =
  | ProfileTextMaterial
  | ProfileListMaterial
  | ProfileGakuchikaMaterial
  | ProfileTraitsMaterial;

export type ProfileWork = {
  id: string;
  title: string;
  description: string;
};

export type ProfileLanguageTone = "primary" | "secondary" | "accent" | "warning";

export type ProfileLanguage = {
  id: string;
  name: string;
  /** 利用文脈（実務・個人開発など） */
  contexts: string[];
  /** 利用期間（例: 1年 / 1.5年 / 8ヶ月） */
  period: string;
  tone: ProfileLanguageTone;
};

export type ProfileEducation = {
  id: string;
  period: string;
  title: string;
  event: string;
};

export type ProfileActivity = {
  id: string;
  title: string;
  tag: string;
  date: string;
};

export type ProfileCertificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ProfileAward = {
  id: string;
  name: string;
  category: string;
  /** 受賞年月（例: 2024/03） */
  date: string;
};

export type ProfileData = {
  basic: ProfileBasic;
  completeness: ProfileCompleteness;
  materials: ProfileMaterial[];
  works: ProfileWork[];
  languages: ProfileLanguage[];
  education: ProfileEducation[];
  educationCurrentIndex: number;
  activities: ProfileActivity[];
  certificates: ProfileCertificate[];
  awards: ProfileAward[];
};
