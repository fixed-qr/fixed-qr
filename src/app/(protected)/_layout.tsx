import { TransactionBottomSheet } from "@/components/bottom-sheets";
import { useUserStore } from "@/store/user-store";
import { Redirect, Stack, usePathname } from "expo-router";

export default function ProtectedLayout() {
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
          contentStyle: { backgroundColor: undefined },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="sheets"
          options={{
            contentStyle: { backgroundColor: undefined },
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
      <TransactionBottomSheet />
    </>
  );
}
