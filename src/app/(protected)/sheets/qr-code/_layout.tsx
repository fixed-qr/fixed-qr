import { Stack } from "expo-router";

export default function QrcodeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    />
  );
}
