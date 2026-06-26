import { SCREEN_PADDING } from "@/constants/screen";
import { useTheme } from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { AppText, AppView } from "./app-ui";

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function AlertModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: Readonly<AlertModalProps>) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else if (mounted) {
      setMounted(false);
    }
  }, [visible, mounted]);

  if (!mounted) return null;

  return (
    <Modal
      transparent
      visible={mounted}
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onCancel ?? onConfirm}
    >
      <AppView
        style={[
          styles.overlay,
          {
            backgroundColor: theme.overlay.primary,
          },
        ]}
      >
        {onCancel && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        )}

        <AppView
          style={[
            styles.container,
            {
              borderColor: theme.border.primary,
              backgroundColor: theme.background.surfaceElevated,
            },
          ]}
        >
          <AppView style={styles.detailsContainer}>
            <AppText variant="headingSmall" style={styles.title}>
              {title}
            </AppText>

            <AppText
              variant="bodyMedium"
              color="secondary"
              style={styles.message}
            >
              {message}
            </AppText>
          </AppView>

          <AppView
            style={[
              styles.horizontalLine,
              { backgroundColor: theme.border.primary },
            ]}
          />

          <View style={styles.actions}>
            {onCancel && (
              <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                  onPress={onCancel}
                  style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.6 : 1 },
                  ]}
                >
                  <AppText variant="button">Cancel</AppText>
                </Pressable>

                <AppView
                  style={[
                    styles.verticalLine,
                    { backgroundColor: theme.border.primary },
                  ]}
                />
              </>
            )}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Confirm"
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <AppText variant="button">Confirm</AppText>
            </Pressable>
          </View>
        </AppView>
      </AppView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SCREEN_PADDING,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
  },
  detailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingHorizontal: 16,
  },
  title: {
    marginVertical: 8,
  },
  message: {
    alignSelf: "stretch",
    textAlign: "center",
    marginBottom: 8,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    borderRadius: 999,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  verticalLine: {
    height: "100%",
    width: 1,
  },
});
