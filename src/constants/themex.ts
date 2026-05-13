/**
 * Below are the colors that are used in the app.
 * The colors are defined in the light and dark mode.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    // Backgrounds
    background: "#FFFFFF",
    backgroundElement: "#F5F5F7",
    backgroundSelected: "#E8E8ED",
    surface: "#FFFFFF",
    card: "#F9FAFB",

    // Text
    text: "#111111",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    textInverse: "#FFFFFF",

    // Borders / Lines
    border: "#E5E7EB",
    divider: "#D1D5DB",

    // Brand / Accent
    primary: "#8B5CF6",
    primaryHover: "#7C3AED",
    primarySoft: "#F3E8FF",

    // Status
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",

    // Overlay
    overlay: "rgba(0,0,0,0.45)",
    shadow: "rgba(0,0,0,0.08)",
  },

  dark: {
    // Backgrounds
    background: "#0D0D0F",
    backgroundElement: "#16171A",
    backgroundSelected: "#1E2024",
    surface: "#141518",
    card: "#1A1B1F",

    // Text
    text: "#F5F5F7",
    textSecondary: "#A1A1AA",
    textMuted: "#6B7280",
    textInverse: "#111111",

    // Borders / Lines
    border: "#2B2E34",
    divider: "#23262B",

    // Brand / Accent
    primary: "#8B5CF6",
    primaryHover: "#A78BFA",
    primarySoft: "rgba(139,92,246,0.16)",

    // Status
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#F87171",
    info: "#60A5FA",

    // Overlay
    overlay: "rgba(0,0,0,0.7)",
    shadow: "rgba(0,0,0,0.35)",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const spacing = {
  0: 0,
  2: 2,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  48: 48,
  64: 64,
} as const;
