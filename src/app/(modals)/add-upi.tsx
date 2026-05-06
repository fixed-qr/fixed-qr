import {
  ScrollView,
  SelectList,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { screenWidth } from "@/constants/dimensions";
import { providers } from "@/constants/providers";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { Provider } from "@/types/provider";
import { validateUpi } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput } from "react-native";

const gap = spacing[8];
const width = (screenWidth - gap * 2 - 40) / 3;

export default function AddUPI() {
  const theme = useTheme();
  const [upi, setUpi] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState<Provider | null>(null);
  const addUpiId = useStore((state) => state.addUpiId);
  const router = useRouter();

  const handleUPITextChange = (value: string) => {
    setUpi(value);
  };

  const handleSubmit = () => {
    const validationError = validateUpi(upi);
    setError(validationError);

    if (!validationError && selected) {
      addUpiId({
        upiId: upi,
        provider: selected.provider,
        label: selected.label,
      });
      router.back();
    }
  };

  return (
    <ScrollView>
      {/* UPI Input */}
      <ThemedView>
        <TextInput
          value={upi}
          onChangeText={handleUPITextChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder="Enter UPI"
          placeholderTextColor={theme.placeholder}
          style={[
            styles.upiIdInput,
            {
              color: theme.text,
              borderColor: error ? theme.danger : theme.inputBorder,
              backgroundColor:
                isFocused || upi
                  ? theme.backgroundSelected
                  : theme.inputBackground,
            },
          ]}
        />
      </ThemedView>
      {/* UPI Input Validation Error */}
      {!!error && (
        <ThemedView>
          <ThemedText type="small" themeColor="danger">
            {error}
          </ThemedText>
        </ThemedView>
      )}
      {/* Select UPI Provider */}
      <ThemedView style={styles.selectListContainer}>
        <SelectList
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
                  borderColor: theme.border,
                  backgroundColor: isSelected
                    ? theme.backgroundSelected
                    : theme.surface,
                },
              ]}
            >
              <Image source={item.logoImage} style={styles.logoImage} />
              <ThemedText style={styles.label}>{item.label}</ThemedText>
            </Pressable>
          )}
        />
      </ThemedView>

      {/* Handle Form Sublimation */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          {
            borderColor: theme.border,
            backgroundColor: pressed
              ? theme.backgroundSelected
              : theme.backgroundElement,
          },
        ]}
        onPress={handleSubmit}
      >
        <ThemedText>Save</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upiIdInput: {
    fontSize: 18,
    marginBlock: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 24,
    fontWeight: 500,
  },
  selectListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
  provider: {
    width: width,
    height: width,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  logoImage: {
    width: 48,
    height: 48,
  },
  label: {
    textAlign: "center",
    fontSize: 14,
  },
  saveButton: {
    marginTop: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 48,
  },
});
