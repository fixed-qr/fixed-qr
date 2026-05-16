import { AppSafeAreaView, AppText } from "@/components/app-ui";
import { StyleSheet } from "react-native";

export default function Banned() {
  return (
    <AppSafeAreaView style={styles.container}>
      <AppText>Banned</AppText>
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
