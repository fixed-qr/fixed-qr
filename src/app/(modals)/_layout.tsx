import { FormSheetHeader } from "@/components";
import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();

  const renderFormSheetHeader = () => <FormSheetHeader />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: renderFormSheetHeader,
        contentStyle: { backgroundColor: theme.background.secondary },
      }}
    >
      <Stack.Screen name="qr-code" />
      <Stack.Screen name="add-upi" />
    </Stack>
  );
}
