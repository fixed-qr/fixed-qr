import { AppLogo, AppName } from "@/components";
import {
  AppIcon,
  AppPressable,
  AppScreenView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useSheet } from "@/sheets/use-sheet";
import { StyleSheet } from "react-native";

export default function GetStartedScreen() {
  const theme = useTheme();
  const sheet = useSheet();

  const onContinuePress = () => {
    sheet.push("GetStartedFormSheet", {});
  };

  const onTermsPrivacyPolicyPress = () => {
    sheet.push("PrivacyPolicySheet", {});
  };

  return (
    <AppScreenView
      style={{
        flex: 1,
        gap: 16,
      }}
    >
      <AppView style={styles.topContainer}>
        <AppView style={styles.header}>
          <AppLogo size={75} />
          <AppName />
          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.description}
          >
            Continue to begin your personalized journey with FixedQR.
          </AppText>
        </AppView>
      </AppView>

      <AppView style={styles.bottomContainer}>
        {/* Action */}
        <AppPressable
          onPress={onContinuePress}
          style={({ pressed }) => [
            styles.getStartedButton,
            {
              borderColor: theme.border.primary,
              backgroundColor: theme.accent.pressed,
            },
          ]}
        >
          <AppText variant="button" color="inverse">
            Continue
          </AppText>
          <AppIcon
            name="arrow-forward"
            size={18}
            style={{
              color: theme.text.inverse,
              fontWeight: 600,
            }}
          />
        </AppPressable>

        {/* Privacy Policy */}

        <AppText
          variant="bodyMedium"
          color="muted"
          style={styles.privacyPolicy}
        >
          By continuing, you agree to our {""}
          <AppText
            variant="bodyMedium"
            color="tertiary"
            onPress={onTermsPrivacyPolicyPress}
          >
            Terms and Privacy Policy.
          </AppText>
        </AppText>
      </AppView>
    </AppScreenView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    gap: 4,
  },

  description: {
    marginTop: 16,
    textAlign: "center",
    maxWidth: "75%",
  },

  bottomContainer: {
    paddingBottom: 75,
    alignItems: "center",
    gap: 24,
  },

  privacyPolicy: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },

  getStartedButton: {
    width: "100%",
    marginTop: 16,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 64,
    borderWidth: 1,
  },
});
