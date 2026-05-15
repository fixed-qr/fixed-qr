import { StyleSheet } from "react-native";
import { ThemedText, ThemedTextProps } from "./themed-text";
import { ThemedView } from "./themed-view";

interface TitleProps extends ThemedTextProps {
  children: string;
}

export function Title({ children, ...rest }: TitleProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText {...rest}>{children}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});
