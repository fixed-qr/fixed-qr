import { SecureInput } from "@/components";
import { Ionicons, ScrollView, ThemedText, ThemedView } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Authenticate() {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleOnSubmit = () => {
    if (password.trim()) {
      setError("");
      return 0;
    } else {
      setError("Password is required");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <ThemedText style={styles.title}>
        Verify your identity to continue
      </ThemedText>
      <Ionicons
        name="lock-closed"
        size={48}
        color={theme.textSecondary}
        style={styles.image}
      />
      <SecureInput value={password} onChangeText={handlePasswordChange} />
      {!!error && (
        <ThemedView style={styles.error}>
          <ThemedText type="small" color="danger">
            {error}
          </ThemedText>
        </ThemedView>
      )}
      <Pressable
        onPress={handleOnSubmit}
        style={({ pressed }) => [
          styles.authenticateButton,
          {
            borderColor: theme.border,
            backgroundColor: pressed ? theme.primaryHover : theme.primary,
          },
        ]}
      >
        <ThemedText color="textInverse">Authenticate</ThemedText>
        <Ionicons
          name="arrow-up"
          size={18}
          color={theme.textInverse}
          style={{ transform: "rotate(45deg)" }}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 16,
  },
  image: {
    marginVertical: 8,
  },
  error: {
    width: "90%",
  },
  authenticateButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    height: 48,
    padding: 8,
    borderRadius: 48,
    borderWidth: 1,
  },
});
