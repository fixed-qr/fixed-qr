import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    >
      <Stack.Screen name="get-started" options={{ animation: "fade" }} />
    </Stack>
  );
}
