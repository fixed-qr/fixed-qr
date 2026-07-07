import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function SystemLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background.secondary },
      }}
    >
      <Stack.Screen name="update" />
    </Stack>
  );
}
