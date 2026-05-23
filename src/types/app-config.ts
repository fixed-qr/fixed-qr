export interface Release {
  version: string;
  versionCode: number;
  title: string;
  downloadUrl: string;
  publishedAt: string;
  notes: string[];
}

export interface AppConfig {
  status: "online" | "maintenance";
  release: Release;
}
