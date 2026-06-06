import { AppLogo, AppName, PasswordInput } from "@/components";
import {
  AppAnimatedPressable,
  AppIcon,
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { LegalInformationBottomSheet } from "@/components/bottom-sheets";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useIdentityStore } from "@/store/identity-store";
import { useUserStore } from "@/store/user-store";
import { User } from "@/types/user";
import { validateUser } from "@/validators/user-validator";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

export default function GetStartedScreen() {
  const theme = useTheme();
  const router = useRouter();
  const verifyIdentity = useIdentityStore((state) => state.verifyIdentity);
  const createUser = useUserStore((state) => state.createUser);
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
      expand("LEGAL_INFORMATION");
    }
  };

  const getCheckboxColor = () => {
    if (isChecked) {
      return theme.border.focus;
    }
    if (isCheckedError) {
      return theme.status.danger;
    }
    return theme.text.muted;
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
      verifyIdentity();
      router.replace("/");
    }
  };

  return (
    <AppSafeAreaView>
      <AppScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
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
          {/* User Name */}
          <AppView
            style={[
              styles.input,
              {
                backgroundColor: theme.background.secondary,
                borderColor: errors.name
                  ? theme.status.danger
                  : theme.border.primary,
              },
            ]}
          >
            <AppView style={styles.left}>
              <AppIcon name="person" size={22} color={theme.text.secondary} />
            </AppView>
            <AppView style={styles.right}>
              <AppText
                variant="bodySmall"
                weight="500"
                color="secondary"
                style={styles.label}
              >
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
            hasError={!!errors.name}
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
              color={getCheckboxColor()}
              style={{
                borderWidth: 1.5,
                borderRadius: 4,
                width: 18,
                height: 18,
              }}
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
          <AppAnimatedPressable
            onPress={handleGetStartedPress}
            containerStyle={{
              width: "100%",
            }}
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
            <AppText variant="button" style={{ color: theme.text.inverse }}>
              Get Started
            </AppText>
            <AppIcon
              name="arrow-up"
              size={18}
              style={{
                transform: "rotate(45deg)",
                color: theme.text.inverse,
                fontWeight: 600,
              }}
            />
          </AppAnimatedPressable>
        </AppView>
      </AppScrollView>
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
    gap: 12,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
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
  inputField: {
    backgroundColor: "transparent",
    margin: 0,
    fontSize: 16,
    height: 40,
    paddingVertical: 4,
  },
  error: {
    alignSelf: "flex-start",
    paddingLeft: 4,
    marginTop: 2,
  },
  privacyPolicy: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  privacyPolicyText: {
    width: "90%",
  },
  getStartedButton: {
    width: "100%",
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
