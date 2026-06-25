import { EmptyCard, Section } from "@/components";
import { AppView } from "@/components/app-ui";
import { useSheet } from "@/features/sheets/use-sheet";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { StyleSheet } from "react-native";
import { SavedUpiAppCard } from "../saved-upi-app-card";

export function SavedUpiAppSection() {
  const sheet = useSheet();
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);

  return (
    <AppView style={styles.container}>
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
          <EmptyCard message="Your Saved UPI ID will appear here." />
        )}
      </Section>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
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
