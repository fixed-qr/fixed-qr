import { AppText, AppView } from "@/components/app-ui";
import { DeleteEverything } from "@/components/delete-everything";
import { Setting } from "@/components/setting";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

interface SettingsProps {
  onTransactionsButtonPress: () => void;
}

export function Settings({ onTransactionsButtonPress }: SettingsProps) {
  const theme = useTheme();

  return (
    <AppView style={styles.container}>
      <AppText
        variant="bodyMedium"
        color="tertiary"
        weight="600"
        style={styles.settingsTitle}
      >
        Settings
      </AppText>
      <AppView
        style={[
          styles.settings,
          {
            backgroundColor: theme.background.secondary,
            borderColor: theme.border.primary,
          },
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
      </AppView>
    </AppView>
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
    borderWidth: 1,
  },
});
