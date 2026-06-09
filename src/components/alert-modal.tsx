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
  }, [visible, mounted, opacity, scale]);

  if (!mounted) return null;

  return (
    <Modal transparent visible={mounted}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity,
            backgroundColor: theme.overlay.primary,
          },
        ]}
      >
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
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {message}
            </AppText>
          </AppView>

          <AppView
            style={[
              styles.horzantalLine,
              { backgroundColor: theme.border.primary },
            ]}
          />

          <View style={styles.actions}>
            {onCancel && (
              <Pressable
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.button,
                  styles.cancelButton,
                  {
                    backgroundColor: pressed
                      ? theme.background.selected
                      : undefined,
                  },
                ]}
              >
                <AppText variant="button">Cancel</AppText>
              </Pressable>
            )}

            {onCancel && (
              <AppView
                style={[
                  styles.verticleLine,
                  { backgroundColor: theme.border.primary },
                ]}
              />
            )}

            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.button,
                styles.confirmButton,
                {
                  backgroundColor: pressed
                    ? theme.background.selected
                    : undefined,
                },
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
  },
  title: {
    marginVertical: 8,
  },
  message: {
    alignSelf: "stretch",
    textAlign: "center",
    marginBottom: 8,
  },
  horzantalLine: {
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
  verticleLine: {
    height: "100%",
    width: 1,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
  },
});
