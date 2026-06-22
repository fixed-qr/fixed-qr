import { AppSheet } from "@/components/app-ui";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, usePathname } from "expo-router";

export default function SheetLayout() {
  const pathname = usePathname();

  return (
    <BottomSheetModalProvider>
      <AppSheet>
        <Stack
          key={pathname}
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: undefined },
          }}
        />
      </AppSheet>
    </BottomSheetModalProvider>
  );
}
