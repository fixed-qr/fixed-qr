import { EmptyCard, Section } from "@/components";
import { useSheet } from "@/sheets/use-sheet";
import { StyleSheet } from "react-native";
import { useUpiAppStore } from "../store";
import { SavedUpiAppCard } from "./upi-app-card";

export function UpiApp() {
  const sheet = useSheet();
  const upiApps = useUpiAppStore((state) => state.upiApps);

  return (
    <Section
      title="Saved UPI IDs"
      titleIconName="add-circle"
      onTitlePress={() => {
        sheet.push("AddUpiAppSheet", {});
      }}
    >
      {Object.keys(upiApps).length ? (
        Object.values(upiApps).map((upiApp, index) => (
          <SavedUpiAppCard
            key={upiApp.appName + index}
            upiApp={upiApp}
            isLast={Object.keys(upiApps).length - 1 == index}
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
