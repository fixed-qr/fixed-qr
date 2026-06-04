import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background.secondary },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modals)"
        options={{
          presentation: "formSheet",
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          sheetCornerRadius: borderRadius,
          sheetElevation: 24,
          sheetAllowedDetents: [0.75],
        }}
      />
    </Stack>
  );
}
