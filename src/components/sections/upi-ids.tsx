import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { UpiId } from "@/components/upi-id";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export function UpiIds() {
  const theme = useTheme();
  const upiIds = useDataStore((state) => state.upiIds);

  return (
    <AppView>
      <Link href={"/(modals)/add-upi"}>
        <AppView style={styles.upiIdTitle}>
          <AppText
            variant="bodyMedium"
            color="tertiary"
            weight="600"
            style={styles.upiIdTitleText}
          >
            Saved UPI IDs
          </AppText>
          <AppIcon name="add-circle" size={18} color={theme.text.secondary} />
        </AppView>
      </Link>
      {upiIds.length ? (
        <AppView
          style={[
            styles.upiIds,
            { backgroundColor: theme.background.secondary },
          ]}
        >
          {upiIds.map((u, index) => (
            <UpiId
              key={u.provider + index}
              logoImage={getProviderLogo(u.provider)}
              label={u.label}
              upiId={u.upiId}
              isLast={index === upiIds.length - 1}
            />
          ))}
        </AppView>
      ) : (
        <AppView
          style={[
            styles.upiIdsEmpty,
            {
              backgroundColor: theme.background.secondary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <AppImage
            source={require("@/assets/images/icons/not-found.png")}
            style={styles.notFoundImage}
          />
          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.emptyText}
          >
            Your Saved UPI ID will appear here.
          </AppText>
        </AppView>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  upiIdTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 8,
  },
  upiIdTitleText: {},
  upiIds: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 28,
  },
  upiIdsEmpty: {
    marginTop: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  notFoundImage: {
    objectFit: "contain",
    width: 120,
    height: 120,
  },
  emptyText: {
    textAlign: "center",
  },
});
