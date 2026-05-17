import { AppSafeAreaView, AppText } from "@/components/app-ui";
import { StyleSheet } from "react-native";

export default function AppStatusScreen() {
  return (
    <AppSafeAreaView style={styles.container}>
      <AppText>AppStatus</AppText>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
