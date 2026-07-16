import { AppPressable, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING, SCREEN_WIDTH } from "@/constants/screen";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

const KEYPAD_KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  "⌫",
];

const KEYPAD_GAP = 8;
const KEY_WIDTH = (SCREEN_WIDTH - KEYPAD_GAP * 3 - SCREEN_PADDING * 2) / 3;

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
}

export function NumericKeypad({
  value,
  onChange,
}: Readonly<NumericKeypadProps>) {
  const theme = useTheme();

  const handleKeyPress = (key: string) => {
    if (value.length !== 0 || key !== "0") {
      onChange(value + key);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <AppView
      style={[
        styles.container,
        { backgroundColor: theme.background.secondary },
      ]}
    >
      {KEYPAD_KEYS.map((keyLabel) => (
        <AppPressable
          key={keyLabel}
          style={({ pressed }) => [
            styles.key,
            {
              borderColor: theme.border.primary,
              backgroundColor: theme.background.cardMuted,
            },
          ]}
          onPress={() =>
            keyLabel === "⌫" ? handleDelete() : handleKeyPress(keyLabel)
          }
        >
          <AppText
            style={[styles.keyText, { fontSize: keyLabel === "⌫" ? 18 : 28 }]}
          >
            {keyLabel}
          </AppText>
        </AppPressable>
      ))}
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: KEYPAD_GAP,
  },

  key: {
    width: KEY_WIDTH,
    height: 60,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  keyText: {
    fontWeight: "600",
  },
});
