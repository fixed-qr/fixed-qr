import { ProviderButton } from "@/components";
import {
    Ionicons,
    ScrollView,
    SelectList,
    ThemedText,
    ThemedView,
} from "@/components/ui";
import { screenWidth } from "@/constants/dimensions";
import { providers } from "@/constants/providers";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { Provider } from "@/types/provider";
import { validateUpi } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

const gap = spacing[8];
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
    <ScrollView>
      {/* UPI Input */}
      <ThemedView>
        <ThemedText style={styles.title}>Add New UPI ID</ThemedText>
        <TextInput
          value={upiId}
          onChangeText={handleUPIIdChange}
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
                isFocused || upiId
                  ? theme.backgroundSelected
                  : theme.inputBackground,
            },
          ]}
        />
      </ThemedView>
      {/* UPI Input Validation Error */}
      {!!error && (
        <ThemedView>
          <ThemedText type="small" color="danger">
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
            <ProviderButton
              label={item.label}
              logoImage={item.logoImage}
              isSelected={isSelected}
              onPress={onPress}
              size={width}
            />
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
        <Ionicons name="save" size={18} color={theme.text} />
        <ThemedText>Save</ThemedText>
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
  upiIdInput: {
    fontSize: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 16,
    height: 46,
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
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 48,
  },
});
