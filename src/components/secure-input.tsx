import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, TextInput } from "react-native";
import { Ionicons, ThemedText, ThemedView } from "./ui";

interface SecureInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function SecureInput({ value, onChangeText }: SecureInputProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.input,
        {
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorder,
        },
      ]}
    >
      <ThemedView style={[styles.shared, styles.left]}>
        <Ionicons name="lock-closed" size={24} color={theme.textSecondary} />
      </ThemedView>
      <ThemedView style={[styles.shared, styles.right]}>
        <ThemedText
          type="smallBold"
          style={[styles.label, { color: theme.textSecondary }]}
        >
          Password
        </ThemedText>
        <TextInput
          textContentType="password"
          placeholder="Enter your secure password"
          placeholderTextColor={theme.textSecondary}
          style={[styles.inputField, { color: theme.text }]}
          onChangeText={onChangeText}
          value={value}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  input: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
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
