import { ProviderButton } from "@/components";
import {
    AppIcon,
    AppScrollView,
    AppSelectList,
    AppText,
    AppView,
} from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { providers } from "@/constants/providers";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
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
  const addUpiId = useDataStore((state) => state.addUpiId);
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
        <AppText style={styles.title}>Add UPI ID</AppText>
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
                isFocused || upiId ? theme.accent.subtle : theme.accent.soft,
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
      <AppScrollView
        horizontal={true}
        style={styles.selectListContainer}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 0,
          marginHorizontal: 0,
          backgroundColor: theme.background.secondary,
        }}
      >
        <AppSelectList
          data={providers}
          selectedItem={selected}
          onSelect={setSelected}
          keyExtractor={(item) => item.provider}
          renderItem={({ item, isSelected, onPress }) => (
            <ProviderButton
              label={item.label}
              logoImage={item.logoImage}
              isSelected={isSelected}
              onPress={onPress}
              size={width}
            />
          )}
        />
      </AppScrollView>

      {/* Handle Form Sublimation */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          {
            borderColor: theme.border.primary,
            backgroundColor: pressed ? theme.accent.subtle : theme.accent.soft,
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
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
});
