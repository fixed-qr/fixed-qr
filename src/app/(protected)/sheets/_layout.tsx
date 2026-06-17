import { AppSheet } from "@/components/app-ui";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";

export default function SheetLayout() {
  return (
    <BottomSheetModalProvider>
      <AppSheet>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: undefined },
          }}
        >
          <Stack.Screen name="qr-code" />
          <Stack.Screen name="upi" />
        </Stack>
      </AppSheet>
    </BottomSheetModalProvider>
  );
}
