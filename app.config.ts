import { ConfigContext, ExpoConfig } from "expo/config";

const APP_VERSION = "1.1.0";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.shaileshio.fixedqr.dev";
  }

  if (IS_PREVIEW) {
    return "com.shaileshio.fixedqr.preview";
  }

  return "com.shaileshio.fixedqr";
};

const getAppName = () => {
  if (IS_DEV) {
    return "FixedQR (Dev)";
  }

  if (IS_PREVIEW) {
    return "FixedQR (Preview)";
  }

  return "FixedQR";
};

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  version: APP_VERSION,
  slug: "fixed-qr",
  scheme: "fixed-qr",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  ios: {
    icon: "./assets/images/icon.png",
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#2563EB",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-image",
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#2563EB",
        android: {
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
    [
      "expo-file-system",
      {
        supportsOpeningDocumentsInPlace: true,
        enableFileSharing: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "ace9df2e-80ec-4d0a-97ae-93d634980679",
    },
  },
  owner: "shaileshio",
});

export default expoConfig;
