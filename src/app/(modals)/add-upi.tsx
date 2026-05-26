import {
    AppIcon,
    AppImage,
    AppScrollView,
    AppSelectList,
    AppText,
    AppView,
} from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { providers } from "@/constants/providers";
import { useTheme } from "@/hooks/use-theme";
import { useUserDataStore } from "@/store/user-data-store";
import { Provider } from "@/types/provider";
import { validateUpi } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

const gap = 8;
const width = (screenWidth - gap * 2 - 40) / 3;

export default function AddUPIScreen() {
  const theme = useTheme();
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState<Provider | null>(null);
  const addUpiId = useUserDataStore((state) => state.addUpiId);
  const router = useRouter();

  const handleUPIIdChange = (value: string) => {
    setUpiId(value);
  };

  const handleSubmit = () => {
    const validationError = validateUpi(upiId);
    setError(validationError);

    if (!validationError && selected) {
      addUpiId({
        upiId: upiId,
        provider: selected.provider,
        label: selected.label,
      });
      router.back();
    }
  };

  return (
    <AppScrollView>
      {/* UPI Input */}
      <AppView>
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Add New UPI ID
          </AppText>
        </AppView>
        <TextInput
          value={upiId}
          onChangeText={handleUPIIdChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder="Enter UPI ID"
          placeholderTextColor={theme.text.tertiary}
          style={[
            styles.upiIdInput,
            {
              color: theme.text.primary,
              borderColor: error ? theme.status.danger : theme.border.secondary,
              backgroundColor:
                isFocused || upiId
                  ? theme.background.selected
                  : theme.background.tertiary,
            },
          ]}
        />
      </AppView>
      {/* UPI Input Validation Error */}
      {!!error && (
        <AppView>
          <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
            {error}
          </AppText>
        </AppView>
      )}
      {/* Select UPI Provider */}
      <AppView style={{ marginTop: 16 }}>
        <AppText variant="bodyLarge">Select to Continue</AppText>
      </AppView>
      <AppView style={styles.selectListContainer}>
        <AppSelectList
          data={providers}
          selectedItem={selected}
          onSelect={setSelected}
          keyExtractor={(item) => item.provider}
          renderItem={({ item, isSelected, onPress }) => (
            <Pressable
              onPress={onPress}
              style={[
                styles.provider,
                {
                  width: width,
                  backgroundColor: isSelected
                    ? theme.background.selected
                    : theme.background.tertiary,
                  borderColor: isSelected
                    ? theme.border.focus
                    : theme.border.primary,
                },
              ]}
            >
              <AppImage source={item.logoImage} style={styles.logoImage} />
              <AppText variant="bodyMedium" style={styles.label}>
                {item.label}
              </AppText>
              {isSelected && (
                <AppIcon
                  name="checkmark-done"
                  size={20}
                  style={[styles.checkmarkDone, { color: theme.status.info }]}
                />
              )}
            </Pressable>
          )}
        />
      </AppView>

      {/* Handle Form Sublimation */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          {
            borderColor: pressed ? theme.border.focus : theme.border.primary,
            backgroundColor: pressed
              ? theme.background.selected
              : theme.background.tertiary,
          },
        ]}
        onPress={handleSubmit}
      >
        <AppIcon name="save" size={18} color={theme.text.primary} />
        <AppText variant="button">Save</AppText>
      </Pressable>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 16,
  },
  upiIdInput: {
    fontSize: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 48,
  },
  selectListContainer: {
    flexGrow: 1,
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
    marginTop: "auto",
    padding: 12,
    borderWidth: 1,
    borderRadius: 48,
  },
  provider: {
    borderRadius: 20,
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
  },
  label: {
    textAlign: "center",
  },
  checkmarkDone: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 4,
    borderRadius: 99,
  },
});
