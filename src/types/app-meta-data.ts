export type StatusCode = "ok" | "maintenance" | "deprecated" | "banned";

export interface Status {
  code: StatusCode;
  title: string;
  message: string;
}

export interface Release {
  version: number;
  title: string;
  apkFileId: string;
  releasedAt: string;
  notes: string[];
}

export interface AppMetaData {
  status: Status;
  release: Release | null;
}
