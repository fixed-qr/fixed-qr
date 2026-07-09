import * as App from "expo-application";
import Constants from "expo-constants";
import { useMemo } from "react";

export type AppVersionInfo = {
  appName: string;
  version: string;
  versionCode: number;
  buildVersion: string;
};

export function useAppVersion(): AppVersionInfo {
  return useMemo(() => {
    const appName =
      App.applicationName ?? Constants.expoConfig?.name ?? "UnknownApp";
    const version =
      App.nativeApplicationVersion ?? Constants.expoConfig?.version ?? "0.0.0";
    const buildVersion = App.nativeBuildVersion ?? "1";

    return {
      appName,
      version,
      versionCode: Number(version.replaceAll(".", "")),
      buildVersion,
    };
  }, []);
}
