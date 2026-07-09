import { AppScreenView, AppText } from "@/components/app-ui";
import { StyleSheet } from "react-native";

export default function VerifyUserIdentityScreen() {
  return (
    <AppScreenView style={styles.container}>
      <AppText>VerifyUserIdentity</AppText>
    </AppScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
