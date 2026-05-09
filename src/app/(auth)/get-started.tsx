import { SecureInput } from "@/components";
import {
    Ionicons,
    SafeAreaScrollView,
    ThemedText,
    ThemedView,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { User } from "@/types/user";
import { validateUser } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Switch, TextInput } from "react-native";

export default function GetStarted() {
  const theme = useTheme();
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<User>>({});
  const createUser = useDataStore((state) => state.setUser);
  const router = useRouter();

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
      router.replace("/");
    }
  };

  return (
    <SafeAreaScrollView>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.appLogo}>
          <Image
            source={require("@/assets/images/expo-logo.png")}
            style={[styles.logoImage, { tintColor: theme.text }]}
          />
        </ThemedView>
        <ThemedText style={styles.appName}>FixedQR</ThemedText>
        <ThemedText
          type="small"
          style={[styles.screenDescription, { color: theme.textSecondary }]}
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
              backgroundColor: theme.inputBackground,
              borderColor: theme.inputBorder,
            },
          ]}
        >
          <ThemedView style={styles.left}>
            <Ionicons name="person" size={24} color={theme.textSecondary} />
          </ThemedView>
          <ThemedView style={styles.right}>
            <ThemedText
              type="smallBold"
              style={[styles.label, { color: theme.textSecondary }]}
            >
              Name
            </ThemedText>
            <TextInput
              textContentType="name"
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
              style={[styles.inputField, { color: theme.text }]}
              value={user.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </ThemedView>
        </ThemedView>
        {!!errors.name && (
          <ThemedView style={styles.error}>
            <ThemedText type="small" color="danger">
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
            <ThemedText type="small" color="danger">
              {errors.password}
            </ThemedText>
          </ThemedView>
        )}

        {/* Privacy Policy */}
        <ThemedView style={styles.privacyPolicy}>
          <Switch />
          <ThemedText
            type="small"
            color="textSecondary"
            style={styles.privacyPolicyText}
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
              borderColor: theme.border,
              backgroundColor: pressed ? theme.primaryHover : theme.primary,
            },
          ]}
        >
          <ThemedText color="textInverse">Get Started</ThemedText>
          <Ionicons
            name="arrow-up"
            size={18}
            style={{
              transform: "rotate(45deg)",
              color: theme.textInverse,
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
    width: "90%",
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
