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
  icon: "./assets/images/app-icons/icon.png",
  userInterfaceStyle: "automatic",
  ios: {
    icon: "./assets/images/app-icons/icon.png",
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#1B1B1B",
      backgroundImage: "./assets/images/app-icons/android/background.png",
      foregroundImage: "./assets/images/app-icons/android/adaptive.png",
      monochromeImage: "./assets/images/app-icons/android/adaptive.png",
    },
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    output: "static",
    favicon: "./assets/images/app-icons/logo.png",
  },
  plugins: [
    "expo-router",
    "expo-image",
    "expo-web-browser",
    "expo-sharing",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#FAFAFB",
        image: "./assets/images/app-icons/splash/dark.png",
        resizeMode: "contain",
        dark: {
          backgroundColor: "#09090B",
          image: "./assets/images/app-icons/splash/light.png",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: ["./assets/fonts/OleoScript/OleoScript-Bold.ttf"],
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
