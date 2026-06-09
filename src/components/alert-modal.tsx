import { useTheme } from "@/hooks/use-theme";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
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

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);

      opacity.setValue(0);
      scale.setValue(0.9);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMounted(false);
      });
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onCancel ?? onConfirm}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity,
            backgroundColor: theme.overlay.primary,
          },
        ]}
      >
        {onCancel && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        )}

        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale }],
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
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
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
    borderRadius: 8,
  },
  cancelButton: {},
  confirmButton: {},
  verticalLine: {
    height: "100%",
    width: 1,
  },
});
