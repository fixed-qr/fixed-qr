/**
 * ------------------------------------------------------------------
 * TOKEN GROUPS
 * ------------------------------------------------------------------
 *
 * - background → Layouts, cards, surfaces, containers
 * - text       → Typography hierarchy
 * - accent     → Brand & interactive colors
 * - status     → Success, warning, error, info
 * - border     → Borders, dividers, focus states
 * - icon       → Icon hierarchy
 * - overlay    → Modal/sheet overlays
 * - shadow     → Elevation shadows
 *
 * ------------------------------------------------------------------
 * BACKGROUND USAGE
 * ------------------------------------------------------------------
 *
 * - primary          → Main app background
 * - secondary        → Section/group background
 * - tertiary         → Nested layout background
 * - surface          → Standard UI surface
 * - surfaceElevated  → Modal/sheet/popover surfaces
 * - card             → Primary card background
 * - cardMuted        → Muted/secondary card
 * - selected         → Active/selected state
 * - disabled         → Disabled background state
 *
 * ------------------------------------------------------------------
 * TEXT USAGE
 * ------------------------------------------------------------------
 *
 * - primary   → Main readable text
 * - secondary → Descriptions/subtitles
 * - tertiary  → Metadata/supporting text
 * - muted     → Placeholder/hint text
 * - disabled  → Disabled/inactive text
 * - inverse   → Text on accent/dark surfaces
 *
 * ------------------------------------------------------------------
 * ACCENT USAGE
 * ------------------------------------------------------------------
 *
 * - primary → Primary actions/buttons/links
 * - pressed → Pressed interaction state
 * - soft    → Soft accent background
 * - subtle  → Very subtle accent tint
 *
 * ------------------------------------------------------------------
 * STATUS USAGE
 * ------------------------------------------------------------------
 *
 * - success → Success states
 * - warning → Warning states
 * - danger  → Error/destructive states
 * - info    → Informational states
 *
 * ------------------------------------------------------------------
 * BORDER USAGE
 * ------------------------------------------------------------------
 *
 * -primary  → Standard borders
 * - secondary→ Stronger borders/dividers
 * - subtle   → Soft separators
 * - focus    → Focused/active states
 *
 * ------------------------------------------------------------------
 * ICON USAGE
 * ------------------------------------------------------------------
 *
 * - primary   → Main icons
 * - secondary → Secondary/inactive icons
 * - muted     → Decorative icons
 * - inverse   → Icons on accent surfaces
 *
 * ------------------------------------------------------------------
 * OVERLAY USAGE
 * ------------------------------------------------------------------
 *
 * - primary → Standard modal overlay
 * - strong  → Fullscreen/heavy overlay
 *
 * ------------------------------------------------------------------
 * SHADOW USAGE
 * ------------------------------------------------------------------
 *
 * - primary → Standard elevation shadow
 * - strong  → High elevation shadow
 *
 */

export const themeColors = {
  light: {
    background: {
      primary: "#FAFAFB",
      secondary: "#F6F7F9",
      tertiary: "#EEF1F4",

      surface: "#FFFFFF",
      surfaceElevated: "#FFFFFF",

      card: "#FFFFFF",
      cardMuted: "#F8F9FB",

      selected: "#F4F0FF",
      disabled: "#ECEFF3",
    },

    text: {
      primary: "#0F172A",
      secondary: "#475569",
      tertiary: "#64748B",

      muted: "#94A3B8",
      disabled: "#CBD5E1",

      inverse: "#FFFFFF",
    },

    accent: {
      primary: "#7C3AED",
      pressed: "#6D28D9",

      soft: "#F5F1FF",
      subtle: "#EDE7FF",
    },

    status: {
      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#2563EB",
    },

    border: {
      primary: "rgba(15, 23, 42, 0.08)",
      secondary: "rgba(15, 23, 42, 0.05)",
      subtle: "rgba(15, 23, 42, 0.03)",

      focus: "#7C3AED",
    },

    icon: {
      primary: "#334155",
      secondary: "#64748B",
      muted: "#94A3B8",

      inverse: "#FFFFFF",
    },

    overlay: {
      primary: "rgba(15, 23, 42, 0.42)",
      strong: "rgba(15, 23, 42, 0.72)",
    },

    shadow: {
      primary: "rgba(15, 23, 42, 0.06)",
      strong: "rgba(15, 23, 42, 0.14)",
    },
  },

  dark: {
    background: {
      primary: "#09090B",
      secondary: "#111114",
      tertiary: "#18181C",

      surface: "#121216",
      surfaceElevated: "#1A1A21",

      card: "#16161B",
      cardMuted: "#1D1D24",

      selected: "rgba(124, 58, 237, 0.20)",
      disabled: "#25252D",
    },

    text: {
      primary: "#FAFAFA",
      secondary: "#D4D4D8",
      tertiary: "#A1A1AA",

      muted: "#71717A",
      disabled: "#52525B",

      inverse: "#09090B",
    },

    accent: {
      primary: "#8B5CF6",
      pressed: "#7C3AED",

      soft: "rgba(139, 92, 246, 0.18)",
      subtle: "rgba(139, 92, 246, 0.10)",
    },

    status: {
      success: "#22C55E",
      warning: "#F59E0B",
      danger: "#F87171",
      info: "#60A5FA",
    },

    border: {
      primary: "rgba(255,255,255,0.07)",
      secondary: "rgba(255,255,255,0.05)",
      subtle: "rgba(255,255,255,0.03)",

      focus: "#8B5CF6",
    },

    icon: {
      primary: "#F4F4F5",
      secondary: "#A1A1AA",
      muted: "#71717A",

      inverse: "#09090B",
    },

    overlay: {
      primary: "rgba(0,0,0,0.55)",
      strong: "rgba(0,0,0,0.78)",
    },

    shadow: {
      primary: "rgba(0,0,0,0.28)",
      strong: "rgba(0,0,0,0.50)",
    },
  },
} as const;

export type ThemeMode = keyof typeof themeColors;
export type ThemePalette = typeof themeColors.light;
export type ThemeSection = keyof ThemePalette;

export type BackgroundToken = keyof ThemePalette["background"];
export type TextToken = keyof ThemePalette["text"];
export type AccentToken = keyof ThemePalette["accent"];
export type StatusToken = keyof ThemePalette["status"];
export type BorderToken = keyof ThemePalette["border"];
export type IconToken = keyof ThemePalette["icon"];
export type OverlayToken = keyof ThemePalette["overlay"];
export type ShadowToken = keyof ThemePalette["shadow"];
