import { AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

interface Props {
  value: string;
  currencySize: number;
  fontSize: number;
}

export function Amount({ value, currencySize, fontSize }: Readonly<Props>) {
  const theme = useTheme();

  return (
    <AppView style={styles.amount}>
      <AppImage
        source={require("@/assets/images/icons/others/rupee.png")}
        tintColor={theme.text.primary}
        style={{
          width: currencySize,
          height: currencySize,
        }}
      />
      <AppText
        style={{
          fontSize: fontSize,
          paddingHorizontal: 2,
        }}
      >
        {value}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  amount: {
    flexDirection: "row",
    alignItems: "center",
  },
});
