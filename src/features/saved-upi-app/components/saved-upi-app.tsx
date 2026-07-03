import { EmptyCard, Section } from "@/components";
import { useSheet } from "@/features/sheets/use-sheet";
import { StyleSheet } from "react-native";
import { useSavedUpiAppStore } from "../store";
import { SavedUpiAppCard } from "./saved-upi-app-card";

export function SavedUpiApp() {
  const sheet = useSheet();
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);

  return (
    <Section
      title="Saved UPI IDs"
      titleIconName="add-circle"
      onTitlePress={() => {
        sheet.push("AddUpiSheet", {});
      }}
    >
      {Object.keys(savedUpiApps).length ? (
        Object.values(savedUpiApps).map((upiApp, index) => (
          <SavedUpiAppCard
            key={upiApp.appName + index}
            upiApp={upiApp}
            isLast={Object.keys(savedUpiApps).length - 1 == index}
          />
        ))
      ) : (
        <EmptyCard message="Your Saved UPI will appear here." />
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  upiId: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {
    gap: 2,
  },
});
