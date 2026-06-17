import { Stack } from "expo-router";

export default function UpiLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    />
  );
}
