import { AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";

interface NotFoundProps {
  message: string;
  image?: ImageSourcePropType;
}

export function NotFound({ message, image }: NotFoundProps) {
  const theme = useTheme();

  return (
    <AppView
      style={[
        styles.notFound,
        {
          backgroundColor: theme.background.secondary,
          borderColor: theme.border.primary,
        },
      ]}
    >
      <AppImage
        source={image || require("@/assets/images/icons/not-found.png")}
        style={styles.notFoundImage}
      />
      <AppText variant="bodySmall" color="secondary" style={styles.message}>
        {message}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    gap: 8,
  },
  notFoundImage: {
    objectFit: "contain",
    width: 75,
    height: 75,
  },
  message: {
    textAlign: "center",
  },
});
