import { AppLogo, AppName, DevInfoButton, PasswordInput } from "@/components";
import {
    AppIcon,
    AppSafeAreaView,
    AppScrollView,
    AppText,
    AppView,
} from "@/components/app-ui";
import {
    DevInfoBottomSheet,
    LegalInformationBottomSheet,
} from "@/components/bottom-sheets";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useUserDataStore } from "@/store/user-data-store";
import { User } from "@/types/user";
import { validateUser } from "@/utils/validators";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

export default function GetStartedScreen() {
  const theme = useTheme();
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const createUser = useUserDataStore((state) => state.setUser);
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<User>>({});
  const [isChecked, setChecked] = useState(false);
  const [isCheckedError, setCheckedError] = useState(false);
  const expand = useBottomSheetStore((state) => state.expand);

  const handleExpand = () => {
    if (!isChecked) {
      expand("legal-information-bottom-sheet");
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGetStartedPress = () => {
    const validationErrors = validateUser(user);
    setErrors(validationErrors);

    if (!isChecked) {
      setCheckedError(true);
      return;
    }

    if (Object.keys(validationErrors).length === 0 && isChecked) {
      createUser(user);
      setIsAuthenticated(true);
      router.replace("/");
    }
  };

  return (
    <AppSafeAreaView>
      <AppView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          paddingVertical: 8,
        }}
      >
        <DevInfoButton />
      </AppView>
      <AppScrollView>
        <AppView style={styles.header}>
          <AppLogo size={48} />
          <AppName />
          <AppText
            variant="bodySmall"
            color="secondary"
            style={styles.screenDescription}
          >
            Get started to begin your personalized journey with FixedQR.
          </AppText>
        </AppView>
        <AppView style={styles.form}>
          {/* Username */}
          <AppView
            style={[
              styles.input,
              {
                backgroundColor: theme.background.secondary,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <AppView>
              <AppIcon name="person" size={24} color={theme.text.secondary} />
            </AppView>
            <AppView style={styles.right}>
              <AppText variant="bodySmall" weight="500" color="secondary">
                Name
              </AppText>
              <TextInput
                textContentType="name"
                placeholder="Enter your name"
                placeholderTextColor={theme.text.secondary}
                style={[styles.inputField, { color: theme.text.primary }]}
                value={user.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </AppView>
          </AppView>
          {!!errors.name && (
            <AppView style={styles.error}>
              <AppText
                variant="bodySmall"
                style={{ color: theme.status.danger }}
              >
                {errors.name}
              </AppText>
            </AppView>
          )}

          {/* Password */}
          <PasswordInput
            value={user.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          {!!errors.password && (
            <AppView style={styles.error}>
              <AppText
                variant="bodySmall"
                style={{ color: theme.status.danger }}
              >
                {errors.password}
              </AppText>
            </AppView>
          )}

          {/* Privacy Policy */}
          <AppView style={styles.privacyPolicy}>
            <Checkbox
              value={isChecked}
              onValueChange={(value) => {
                setChecked(value);
                setCheckedError(false);
                handleExpand();
              }}
              color={
                isChecked
                  ? theme.border.focus
                  : isCheckedError
                    ? theme.status.danger
                    : theme.text.muted
              }
              style={{ borderWidth: 1.5, borderRadius: 4 }}
            />
            <Pressable
              onPress={() => {
                setChecked((prev) => !prev);
                handleExpand();
              }}
            >
              <AppText
                variant="bodySmall"
                style={[
                  styles.privacyPolicyText,
                  {
                    color: isCheckedError
                      ? theme.status.danger
                      : theme.text.secondary,
                  },
                ]}
              >
                I agree to the Terms of Service and Privacy Policy.
              </AppText>
            </Pressable>
          </AppView>

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
            <AppText style={{ color: theme.text.inverse }}>Get Started</AppText>
            <AppIcon
              name="arrow-up"
              size={18}
              style={{
                transform: "rotate(45deg)",
                color: theme.text.inverse,
                fontWeight: 600,
              }}
            />
          </Pressable>
        </AppView>
      </AppScrollView>
      <DevInfoBottomSheet />
      <LegalInformationBottomSheet />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  screenDescription: {
    marginTop: 6,
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
    paddingTop: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  right: {
    flex: 1,
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
    marginTop: 12,
    paddingInline: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
