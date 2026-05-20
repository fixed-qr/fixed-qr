import {
    AppBottomSheet,
    AppGroup,
    AppIcon,
    AppImage,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useDevInfoStore } from "@/store/dev-info-store";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { openURL } from "expo-linking";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export function DevInfoBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) => state.register("dev-info-sheet"));
  const { devInfo, loading, fetchDevInfo } = useDevInfoStore();

  useEffect(() => {
    fetchDevInfo();
  }, []);

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      snapPoints={["50%", "75%", "90%"]}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        {!loading && devInfo ? (
          <AppView>
            <AppView style={styles.titleContainer}>
              <AppText variant="headingSmall" weight="600">
                Developer Profile
              </AppText>
            </AppView>
            <AppView
              backgroundColor="card"
              style={[
                styles.devProfileInfo,
                { borderColor: theme.border.primary },
              ]}
            >
              <AppView
                style={[
                  styles.devProfileLeft,
                  { borderColor: theme.border.secondary },
                ]}
              >
                <AppImage
                  source={{ uri: devInfo?.profile_image }}
                  style={styles.devProfileImage}
                />
              </AppView>
              <AppView style={styles.devProfileRight}>
                <AppText variant="bodyLarge">{devInfo?.name}</AppText>
                <AppText variant="bodySmall" color="secondary">
                  {devInfo?.bio}
                </AppText>
              </AppView>
            </AppView>
            <Pressable
              onPress={() => {
                openURL(devInfo.website);
              }}
              style={({ pressed }) => [
                styles.websiteButton,
                {
                  borderColor: pressed
                    ? theme.border.focus
                    : theme.border.primary,
                  backgroundColor: pressed
                    ? theme.background.cardMuted
                    : theme.background.card,
                },
              ]}
            >
              <AppView>
                <AppIcon
                  name="link"
                  size={20}
                  color={theme.text.primary}
                  style={{ transform: "rotate(90deg)" }}
                />
              </AppView>
              <AppView style={styles.websiteButtonInfo}>
                <AppText variant="button">Website</AppText>
                <AppText variant="bodySmall" color="secondary">
                  {devInfo?.website}
                </AppText>
              </AppView>
              <AppView>
                <AppIcon
                  name="arrow-forward"
                  size={18}
                  color={theme.text.primary}
                />
              </AppView>
            </Pressable>
            <AppGroup
              title="About"
              containerStyle={{ backgroundColor: theme.background.card }}
            >
              <AppView
                style={{
                  paddingVertical: 8,
                }}
              >
                <AppText variant="bodyMedium">{devInfo?.about}</AppText>
              </AppView>
            </AppGroup>
            <AppView style={{ marginTop: 16 }}>
              <AppGroup
                title="Contact"
                containerStyle={{ backgroundColor: theme.background.card }}
              >
                {devInfo.social_links.map((socialLink, index) => (
                  <Pressable
                    key={socialLink.platform + index}
                    onPress={() => {
                      openURL(socialLink.url);
                    }}
                    style={[
                      styles.socialButton,
                      {
                        borderBottomWidth:
                          devInfo.social_links.length - 1 === index ? 0 : 1,
                        borderColor: theme.border.primary,
                      },
                    ]}
                  >
                    <AppIcon
                      name={`logo-${socialLink.platform}` as any}
                      size={24}
                      color={theme.text.primary}
                    />
                    <AppText
                      variant="button"
                      color="primary"
                      style={styles.socialButtonLabel}
                    >
                      {socialLink.platform}
                    </AppText>
                    <AppView>
                      <AppIcon
                        name="open-outline"
                        size={18}
                        color={theme.text.primary}
                      />
                    </AppView>
                  </Pressable>
                ))}
              </AppGroup>
            </AppView>
            <AppView style={{ marginTop: 16 }}>
              <AppGroup
                title="Support"
                containerStyle={{ backgroundColor: theme.background.card }}
              >
                {devInfo.support.map((sup, index) => (
                  <Pressable
                    key={sup.type + index}
                    onPress={() => {
                      openURL(sup.url);
                    }}
                    style={[
                      styles.supportButton,
                      {
                        borderBottomWidth:
                          devInfo.support.length - 1 === index ? 0 : 1,
                        borderColor: theme.border.primary,
                      },
                    ]}
                  >
                    <AppIcon
                      name={
                        sup.type === "phone"
                          ? "phone-portrait-outline"
                          : "mail-outline"
                      }
                      size={24}
                      color={theme.text.primary}
                    />
                    <AppText
                      variant="button"
                      color="primary"
                      style={styles.supportButtonLabel}
                    >
                      {sup.value}
                    </AppText>
                    <AppView>
                      <AppIcon
                        name="open-outline"
                        size={18}
                        color={theme.text.primary}
                      />
                    </AppView>
                  </Pressable>
                ))}
              </AppGroup>
            </AppView>
          </AppView>
        ) : (
          <ActivityIndicator size={24} color={theme.text.primary} />
        )}
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  devProfileInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 16,
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 8,
  },
  devProfileLeft: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    overflow: "hidden",
  },
  devProfileImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  devProfileRight: {
    flex: 1,
    gap: 4,
  },
  websiteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 50,
  },
  websiteButtonInfo: {
    marginRight: "auto",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  socialButtonLabel: {
    flex: 1,
    marginRight: "auto",
    textTransform: "capitalize",
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  supportButtonLabel: {
    flex: 1,
    marginRight: "auto",
  },
});
