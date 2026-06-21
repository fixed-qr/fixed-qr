import {
  AppIcon,
  AppImage,
  AppPressable,
  AppSelectList,
  AppText,
  AppView,
} from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { supportedUpiApps } from "@/constants/supported-upi-apps";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { UpiAppName } from "@/types/upi-app-name";
import { validateUpiId } from "@/validators/upi-id-validator";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

const gap = 8;
const width = (screenWidth - gap * 2 - 40) / 3;

export default function AddUpiSheet() {
  const theme = useTheme();
  const pathname = usePathname();
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAppName, setSelectedAppName] = useState<UpiAppName | null>(
    null,
  );
  const [upiAppError, setUpiAppError] = useState<string | null>(null);
  const addUpiApp = useSavedUpiAppStore((state) => state.addUpiApp);
  const router = useRouter();

  const handleUPIIdChange = (value: string) => {
    setUpiId(value);
    setError(null);
  };

  const handleSubmit = () => {
    const validationError = validateUpiId(upiId);
    setError(validationError);

    if (!selectedAppName) {
      setUpiAppError("Please select UPI ID provider app");
      return;
    }

    if (!validationError && !upiAppError) {
      addUpiApp(selectedAppName, {
        appName: selectedAppName,
        upiId: upiId,
      });
      router.back();
    }
  };

  return (
    <BottomSheetScrollView
      key={pathname}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <AppView>
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Add New UPI ID
          </AppText>
        </AppView>

        {/* Unified Input Structure to match Name/Password designs */}
        <AppView
          style={[
            styles.input,
            {
              backgroundColor:
                isFocused || upiId
                  ? theme.background.selected
                  : theme.background.tertiary,
              borderColor: error ? theme.status.danger : theme.border.primary,
            },
          ]}
        >
          <AppView style={styles.left}>
            <AppIcon
              name="card"
              size={22}
              color={error ? theme.status.danger : theme.text.secondary}
            />
          </AppView>
          <AppView style={styles.right}>
            <AppText
              variant="bodySmall"
              weight="500"
              color="secondary"
              style={[styles.label, error && { color: theme.status.danger }]}
            >
              UPI ID
            </AppText>
            <BottomSheetTextInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter your UPI ID here"
              placeholderTextColor={theme.text.secondary}
              style={[styles.inputField, { color: theme.text.primary }]}
              value={upiId}
              onChangeText={handleUPIIdChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </AppView>
        </AppView>
      </AppView>

      {/* UPI Input Validation Error */}
      {!!error && (
        <AppView style={styles.errorContainer}>
          <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
            {error}
          </AppText>
        </AppView>
      )}

      {/* Select UPI upiApp */}
      <AppView style={{ marginTop: 24, marginBottom: 12 }}>
        <AppText variant="bodyLarge" weight="600">
          Select App to Continue
        </AppText>
      </AppView>

      <AppView style={styles.selectListContainer}>
        <AppSelectList
          data={supportedUpiApps}
          selectedItem={selectedAppName}
          onSelect={setSelectedAppName}
          keyExtractor={(item) => item}
          renderItem={({ item, isSelected, onPress }) => (
            <AppPressable
              onPress={() => {
                onPress();
                setUpiAppError(null);
              }}
              style={[
                styles.upiAppCard,
                {
                  borderColor: upiAppError
                    ? theme.status.danger
                    : theme.border.primary,
                  backgroundColor: isSelected
                    ? theme.background.selected
                    : theme.background.tertiary,
                },
              ]}
            >
              <AppImage source={upiAppLogo[item]} style={styles.logoImage} />
              <AppText variant="bodyMedium" style={styles.upiAppLabel}>
                {item}
              </AppText>
              {isSelected && (
                <AppIcon
                  name="checkmark-done"
                  size={16}
                  style={[styles.checkmarkDone, { color: theme.status.info }]}
                />
              )}
            </AppPressable>
          )}
        />
      </AppView>

      {/* Handle Form Save Action */}
      <AppPressable
        style={({ pressed }) => [
          styles.saveButton,
          {
            borderColor: theme.border.primary,
            backgroundColor: pressed
              ? theme.accent.pressed
              : theme.accent.primary,
          },
        ]}
        onPress={handleSubmit}
      >
        <AppIcon name="save" size={18} color={theme.text.inverse} />
        <AppText variant="button" style={{ color: theme.text.inverse }}>
          Save
        </AppText>
      </AppPressable>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
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
  errorContainer: {
    alignSelf: "flex-start",
    paddingLeft: 4,
    marginTop: 4,
  },
  selectListContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: gap,
    marginBottom: 28,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    height: 54,
    borderRadius: 48,
  },
  upiAppCard: {
    width: width,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    paddingVertical: 16,
    position: "relative",
  },
  logoImage: {
    width: 38,
    height: 38,
    marginBottom: 6,
  },
  upiAppLabel: {
    textAlign: "center",
    fontSize: 13,
  },
  checkmarkDone: {
    position: "absolute",
    top: 6,
    right: 6,
  },
});
