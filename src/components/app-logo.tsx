import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { AppImage, AppView } from "./app-ui";

interface AppLogoProps {
  size?: number;
}

export function AppLogo({ size = 32 }: AppLogoProps) {
  const theme = useTheme();

  return (
    <AppView style={[styles.appLogo, { width: size, height: size }]}>
      <AppImage
        source={require("@/assets/images/expo-logo.png")}
        style={styles.appLogoImage}
        tintColor={theme.text.primary}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  appLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  appLogoImage: {
    width: "100%",
    height: "100%",
  },
});
