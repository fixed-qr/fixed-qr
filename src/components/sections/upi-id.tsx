import { EmptyCard } from "@/components";
import { AppGroup, AppView } from "@/components/app-ui";
import { UpiId } from "@/components/upi-id";
import { useDataStore } from "@/store/data-store";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export function UpiIdSection() {
  const router = useRouter();
  const upiIds = useDataStore((state) => state.upiIds);

  return (
    <AppView style={styles.container}>
      <AppGroup
        title="Saved UPI IDs"
        titleIconName="add-circle"
        onTitlePress={() => {
          router.navigate("/(modals)/add-upi");
        }}
      >
        {upiIds.length ? (
          upiIds.map((u, index) => (
            <UpiId
              key={u.provider + index}
              logoImage={getProviderLogo(u.provider)}
              label={u.label}
              upiId={u.upiId}
              isLast={upiIds.length - 1 == index}
            />
          ))
        ) : (
          <EmptyCard message="Your Saved UPI ID will appear here." />
        )}
      </AppGroup>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});
