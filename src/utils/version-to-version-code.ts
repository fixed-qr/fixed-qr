export function versionToVersionCode(version: string): number {
  return Number(version.split(".").join(""));
}
