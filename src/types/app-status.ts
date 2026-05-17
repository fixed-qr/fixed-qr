export type StatusCode = "ok" | "maintenance" | "deprecated" | "discontinued";

export interface Release {
  version: number;
  title: string;
  apkFileId: string;
  dateTime: string;
  notes: string[];
}

export interface AppStatus {
  code: StatusCode;
  title: string;
  message: string;
  release: Release | null;
}
