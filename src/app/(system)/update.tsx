import { AppScreenView } from "@/components/app-ui";
import { AppUpdate } from "@/features/app-update/components";

export default function AppUpdateScreen() {
  return (
    <AppScreenView style={{ justifyContent: "center" }}>
      <AppUpdate />
    </AppScreenView>
  );
}
