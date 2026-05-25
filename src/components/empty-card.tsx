import { AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";

interface EmptyCardProps {
  message: string;
  image?: ImageSourcePropType;
}

export function EmptyCard({ message, image }: EmptyCardProps) {
  const theme = useTheme();

  return (
    <AppView
      style={[
        styles.emptyCard,
        {
          backgroundColor: theme.background.secondary,
          borderColor: theme.border.primary,
        },
      ]}
    >
      <AppImage
        source={image || require("@/assets/icons/others/empty.png")}
        style={styles.emptyCardImage}
      />
      <AppText variant="bodySmall" color="secondary" style={styles.message}>
        {message}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderRadius: 24,
    gap: 8,
  },
  emptyCardImage: {
    objectFit: "contain",
    width: 75,
    height: 75,
  },
  message: {
    textAlign: "center",
  },
});
