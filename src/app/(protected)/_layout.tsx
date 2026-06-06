import {
  SavedUpiAppQrCodeBottomSheet,
  TransactionBottomSheet,
} from "@/components/bottom-sheets";
import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import { Redirect, Stack, usePathname } from "expo-router";

export default function ProtectedLayout() {
  const theme = useTheme();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  if (!user && pathname !== "/(auth)/get-started") {
    return <Redirect href="/(auth)/get-started" />;
  }

  return (
    <>
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
      <SavedUpiAppQrCodeBottomSheet />
      <TransactionBottomSheet />
    </>
  );
}
