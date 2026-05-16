export interface AppMetaData {
  status: "ok";
  version: string;
  update: {
    releaseDate: string;
    title: string;
    description: string[];
    sourceId: string;
  };
}
