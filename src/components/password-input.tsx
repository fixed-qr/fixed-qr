import { AppIcon, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

interface SecureInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => void;
  hasError?: boolean;
}

export function PasswordInput({
  value,
  onChangeText,
  onSubmitEditing,
  hasError = false,
}: Readonly<SecureInputProps>) {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AppView
      style={[
        styles.input,
        {
          backgroundColor: theme.background.secondary,
          borderColor: hasError ? theme.status.danger : theme.border.primary,
        },
      ]}
    >
      <AppView style={styles.left}>
        <AppIcon name="lock-closed" size={22} color={theme.text.secondary} />
      </AppView>
      <AppView style={styles.right}>
        <AppText
          variant="bodyMedium"
          style={[styles.label, { color: theme.text.secondary }]}
        >
          Password
        </AppText>
        <AppView style={styles.fieldRow}>
          <TextInput
            secureTextEntry={!isVisible}
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
          <Pressable
            onPress={() => setIsVisible((prev) => !prev)}
            style={styles.eyeContainer}
          >
            <AppIcon
              name={isVisible ? "eye-off" : "eye"}
              size={22}
              color={theme.text.secondary}
            />
          </Pressable>
        </AppView>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1,
  },
  label: {
    marginBottom: 2,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    margin: 0,
    fontSize: 16,
    height: 40,
    paddingVertical: 4,
  },
  eyeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
