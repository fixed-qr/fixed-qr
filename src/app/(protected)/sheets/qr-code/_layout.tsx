import { Stack, usePathname } from "expo-router";

export default function QrcodeLayout() {
  const pathname = usePathname();

  return (
    <Stack
      key={pathname}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="result"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
