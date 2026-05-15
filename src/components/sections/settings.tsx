import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { DeleteEverything } from "../delete-everything";
import { Setting } from "../setting";
import { ThemedText, ThemedView } from "../ui";

interface SettingsProps {
  onTransactionsButtonPress: () => void;
}

export function Settings({ onTransactionsButtonPress }: SettingsProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        variant="bodySmall"
        color="tertiary"
        weight="600"
        style={styles.settingsTitle}
      >
        Settings
      </ThemedText>
      <ThemedView
        style={[
          styles.settings,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        <DeleteEverything />
        <Setting
          leftIcon="snow"
          label="Transactions"
          isLast={true}
          onPress={() => {
            onTransactionsButtonPress();
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  settingsTitle: {
    paddingInline: 8,
  },
  settings: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 28,
  },
});
