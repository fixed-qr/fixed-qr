import { AppImage } from "@/components/app-ui";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { Pressable, StyleSheet } from "react-native";

export function DevButton() {
  const expand = useBottomSheetStore((state) => state.expand);

  return (
    <Pressable
      style={styles.devButton}
      onPress={() => {
        expand("dev-sheet");
      }}
    >
      <AppImage
        source={require("@/assets/icons/developer/developer.png")}
        style={styles.devImage}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  devButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  devImage: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
});
