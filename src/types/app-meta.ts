export interface AppMeta {
  status: "ok" | "banned";
  version: string;
  update: {
    sourceId: string;
    title: string;
    description: string;
  };
}
