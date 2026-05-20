import { AppIcon, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, TextInput } from "react-native";

interface SecureInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => void;
}

export function SecureInput({
  value,
  onChangeText,
  onSubmitEditing,
}: SecureInputProps) {
  const theme = useTheme();

  return (
    <AppView
      style={[
        styles.input,
        {
          backgroundColor: theme.background.secondary,
          borderColor: theme.border.primary,
        },
      ]}
    >
      <AppView style={[styles.shared, styles.left]}>
        <AppIcon name="lock-closed" size={24} color={theme.text.secondary} />
      </AppView>
      <AppView style={[styles.shared, styles.right]}>
        <AppText
          variant="bodyMedium"
          style={[styles.label, { color: theme.text.secondary }]}
        >
          Password
        </AppText>
        <TextInput
          // secureTextEntry
          textContentType="password"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="done"
          placeholder="Enter your secure password"
          placeholderTextColor={theme.text.secondary}
          style={[styles.inputField, { color: theme.text.primary }]}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          onSubmitEditing={onSubmitEditing}
        />
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  left: {},
  right: {
    flex: 1,
  },
  label: {},
  inputField: {
    margin: 0,
    fontSize: 16,
  },
});
