export function versionToNumber(version: string): number {
  return Number(version.split(".").join(""));
}
