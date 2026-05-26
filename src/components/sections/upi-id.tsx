import { EmptyCard } from "@/components";
import {
    AppGroup,
    AppIcon,
    AppImage,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useUserDataStore } from "@/store/user-data-store";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet } from "react-native";

export function UpiIdSection() {
  const theme = useTheme();
  const router = useRouter();
  const upiIds = useUserDataStore((state) => state.upiIds);
  const removeUpiId = useUserDataStore((state) => state.removeUpiId);

  const handleRemoveUpiId = (upiId: string) => {
    Alert.alert(
      "Remove UPI ID",
      `Are you sure you want to remove this UPI ID (${upiId})?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeUpiId(upiId);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

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
          upiIds.map((upiId, index) => (
            <AppView
              key={upiId.provider + index}
              style={[
                styles.upiId,
                {
                  borderColor: theme.border.primary,
                  borderBottomWidth: upiIds.length - 1 == index ? 0 : 1,
                },
              ]}
            >
              <AppView style={styles.left}>
                <AppImage
                  source={getProviderLogo(upiId.provider)}
                  style={styles.logoImage}
                />
                <AppView style={styles.upiIdInfo}>
                  <AppText variant="button">{upiId.label}</AppText>
                  <AppText variant="bodySmall" color="tertiary">
                    {upiId.upiId}
                  </AppText>
                </AppView>
              </AppView>
              <AppView style={styles.right}>
                <Pressable
                  onPress={() => {
                    handleRemoveUpiId(upiId.upiId);
                  }}
                >
                  <AppIcon name="close" size={18} color={theme.text.primary} />
                </Pressable>
              </AppView>
            </AppView>
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
