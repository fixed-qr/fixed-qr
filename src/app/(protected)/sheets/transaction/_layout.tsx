import { Stack, usePathname } from "expo-router";

export default function TransactionLayout() {
  const pathname = usePathname();

  return (
    <Stack
      key={pathname}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    />
  );
}
