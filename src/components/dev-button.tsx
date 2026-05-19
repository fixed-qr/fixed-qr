import { AppImage } from "@/components/app-ui";
import { useDevStore } from "@/store/dev-store";
import { Pressable, StyleSheet } from "react-native";

interface DevButtonProps {
  onPress?: () => void;
}

export function DevButton({ onPress }: DevButtonProps) {
  const expand = useDevStore((state) => state.expand);

  return (
    <Pressable style={styles.devButton} onPress={expand}>
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
