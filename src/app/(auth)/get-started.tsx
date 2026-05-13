import { SecureInput } from "@/components";
import {
    Ionicons,
    SafeAreaScrollView,
    ThemedText,
    ThemedView,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import { User } from "@/types/user";
import { validateUser } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Switch, TextInput } from "react-native";

export default function GetStartedScreen() {
  const theme = useTheme();
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const createUser = useDataStore((state) => state.setUser);
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<User>>({});

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGetStartedPress = () => {
    const validationErrors = validateUser(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      createUser(user);
      setIsAuthenticated(true);
      router.replace("/");
    }
  };

  return (
    <SafeAreaScrollView>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.appLogo}>
          <Image
            source={require("@/assets/images/expo-logo.png")}
            style={[styles.logoImage, { tintColor: theme.text.primary }]}
          />
        </ThemedView>
        <ThemedText style={styles.appName}>FixedQR</ThemedText>
        <ThemedText
          variant="small"
          style={[styles.screenDescription, { color: theme.text.muted }]}
        >
          Get started to begin your personalized journey with FixedQR.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.form}>
        {/* Username */}
        <ThemedView
          style={[
            styles.input,
            {
              backgroundColor: theme.background.secondary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <ThemedView style={styles.left}>
            <Ionicons name="person" size={24} color={theme.text.secondary} />
          </ThemedView>
          <ThemedView style={styles.right}>
            <ThemedText
              variant="small"
              weight="500"
              style={[styles.label, { color: theme.text.secondary }]}
            >
              Name
            </ThemedText>
            <TextInput
              textContentType="name"
              placeholder="Enter your name"
              placeholderTextColor={theme.text.secondary}
              style={[styles.inputField, { color: theme.text.primary }]}
              value={user.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </ThemedView>
        </ThemedView>
        {!!errors.name && (
          <ThemedView style={styles.error}>
            <ThemedText variant="small" style={{ color: theme.status.danger }}>
              {errors.name}
            </ThemedText>
          </ThemedView>
        )}

        {/* Password */}
        <SecureInput
          value={user.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        {!!errors.password && (
          <ThemedView style={styles.error}>
            <ThemedText variant="small" style={{ color: theme.status.danger }}>
              {errors.password}
            </ThemedText>
          </ThemedView>
        )}

        {/* Privacy Policy */}
        <ThemedView style={styles.privacyPolicy}>
          <Switch />
          <ThemedText
            variant="small"
            style={[styles.privacyPolicyText, { color: theme.text.secondary }]}
          >
            I agree to the Terms of Services & Privacy Policy
          </ThemedText>
        </ThemedView>

        {/* Action */}
        <Pressable
          onPress={handleGetStartedPress}
          style={({ pressed }) => [
            styles.getStartedButton,
            {
              borderColor: theme.border.primary,
              backgroundColor: pressed
                ? theme.accent.pressed
                : theme.accent.primary,
            },
          ]}
        >
          <ThemedText style={{ color: theme.text.inverse }}>
            Get Started
          </ThemedText>
          <Ionicons
            name="arrow-up"
            size={18}
            style={{
              transform: "rotate(45deg)",
              color: theme.text.inverse,
              fontWeight: 600,
            }}
          />
        </Pressable>
      </ThemedView>
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 64,
    marginBottom: 16,
  },
  appLogo: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
  appName: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 6,
  },
  screenDescription: {
    textAlign: "center",
    maxWidth: "75%",
  },
  form: {
    alignItems: "center",
    gap: 6,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
  },
  left: {
    backgroundColor: "transparent",
  },
  right: {
    flex: 1,
    backgroundColor: "transparent",
  },
  label: {
    backgroundColor: "transparent",
  },
  inputField: {
    backgroundColor: "transparent",
    margin: 0,
    fontSize: 16,
  },
  error: {
    width: "90%",
  },
  privacyPolicy: {
    width: "90%",
    marginTop: 12,
    paddingInline: 12,
    flexDirection: "row",
  },
  privacyPolicyText: {
    width: "90%",
  },
  getStartedButton: {
    width: "90%",
    marginTop: 32,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 64,
    borderWidth: 1,
  },
});
