import { StyleSheet } from "react-native";
import { AppText } from "./app-ui";

export function AppName() {
  return (
    <AppText
      variant="headingMedium"
      weight="600"
      color="primary"
      style={{ fontFamily: "OleoScript-Bold" }}
    >
      FixedQR
    </AppText>
  );
}

const styles = StyleSheet.create({});
