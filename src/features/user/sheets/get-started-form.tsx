import { PasswordSheetInput } from "@/components";
import { AppIcon, AppPressable, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { useSheet } from "@/sheets/use-sheet";
import { User } from "@/types/user";
import { validateUser } from "@/validators/user-validator";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export function GetStartedFormSheet() {
  const theme = useTheme();
  const sheet = useSheet();

  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [form, setForm] = useState<User>({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<User>>({});

  const { setUser, verifyIdentity } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      verifyIdentity: state.verifyIdentity,
    })),
  );

  const onChange = (field: keyof User, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  const onGetStartedPress = () => {
    const validationErrors = validateUser(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setUser({ name: form.name, password: form.password });
      verifyIdentity();
      sheet.pop();
      router.replace("/");
    }
  };

  return (
    <BottomSheetView
      style={{
        flex: 1,
        gap: 16,
        padding: SCREEN_PADDING,
        backgroundColor: theme.background.secondary,
      }}
    >
      <AppView style={styles.form}>
        {/* User Name */}
        <AppView
          style={[
            styles.input,
            {
              backgroundColor: isFocused
                ? theme.background.selected
                : theme.background.tertiary,
              borderColor: errors.name
                ? theme.status.danger
                : theme.border.primary,
            },
          ]}
        >
          <AppView style={styles.left}>
            <AppIcon
              name="person"
              size={22}
              color={errors.name ? theme.status.danger : theme.text.secondary}
            />
          </AppView>
          <AppView style={styles.right}>
            <AppText
              variant="bodySmall"
              weight="500"
              color="secondary"
              style={[
                styles.label,
                {
                  color: errors.name
                    ? theme.status.danger
                    : theme.text.secondary,
                },
              ]}
            >
              Name
            </AppText>
            <BottomSheetTextInput
              textContentType="name"
              placeholder="Enter your name"
              placeholderTextColor={theme.text.secondary}
              style={[styles.inputField, { color: theme.text.primary }]}
              value={form.name}
              onChangeText={(text) => onChange("name", text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </AppView>
        </AppView>
        {!!errors.name && (
          <AppView style={styles.error}>
            <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
              {errors.name}
            </AppText>
          </AppView>
        )}

        {/* Password */}
        <PasswordSheetInput
          value={form.password}
          onChangeText={(text) => onChange("password", text)}
          hasError={!!errors.password}
        />
        {!!errors.password && (
          <AppView style={styles.error}>
            <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
              {errors.password}
            </AppText>
          </AppView>
        )}

        {/* Action */}
        <AppPressable
          onPress={onGetStartedPress}
          style={({ pressed }) => [
            styles.getStartedButton,
            {
              borderColor: theme.border.primary,
              backgroundColor: theme.accent.primary,
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
        </AppPressable>
      </AppView>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    gap: 16,
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
  },

  getStartedButton: {
    width: "100%",
    marginTop: 16,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 64,
    borderWidth: 1,
  },
});
