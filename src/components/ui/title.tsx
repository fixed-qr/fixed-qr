import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "./themed-text";

interface TitleProps {
  children: string;
  style?: TextStyle;
}

export function Title({ children, style }: TitleProps) {
  const theme = useTheme();
  return (
    <ThemedText
      style={[
        styles.title,
        { backgroundColor: theme.background.secondary },
        style,
      ]}
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
  },
});
