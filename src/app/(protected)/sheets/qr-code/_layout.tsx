import { Stack } from "expo-router";

export default function QrcodeLayout() {
  return (
    <Stack
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
