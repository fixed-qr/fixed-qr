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
      primary: "#FCFCFD",
      secondary: "#F8F8FA",
      tertiary: "#F1F3F5",
      surface: "#FFFFFF",
      surfaceElevated: "#FFFFFF",
      card: "#FEFEFE",
      cardMuted: "#F6F7F9",
      selected: "#F3F0FF",
      disabled: "#ECEEF2",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      tertiary: "#6B7280",
      muted: "#9CA3AF",
      disabled: "#C7CDD4",
      inverse: "#FFFFFF",
    },
    accent: {
      primary: "#7C3AED",
      pressed: "#6D28D9",
      soft: "#F5F3FF",
      subtle: "#EDE9FE",
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
      primary: "#374151",
      secondary: "#6B7280",
      muted: "#9CA3AF",
      inverse: "#FFFFFF",
    },
    overlay: {
      primary: "rgba(15, 23, 42, 0.40)",
      strong: "rgba(15, 23, 42, 0.68)",
    },
    shadow: {
      primary: "rgba(15, 23, 42, 0.06)",
      strong: "rgba(15, 23, 42, 0.12)",
    },
  },
  dark: {
    background: {
      primary: "#09090B",
      secondary: "#111113",
      tertiary: "#18181B",
      surface: "#111113",
      surfaceElevated: "#1C1C21",
      card: "#18181B",
      cardMuted: "#202027",
      selected: "rgba(124, 58, 237, 0.18)",
      disabled: "#27272A",
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

      soft: "rgba(139, 92, 246, 0.16)",
      subtle: "rgba(139, 92, 246, 0.10)",
    },
    status: {
      success: "#22C55E",
      warning: "#F59E0B",
      danger: "#F87171",
      info: "#60A5FA",
    },
    border: {
      primary: "rgba(255,255,255,0.08)",
      secondary: "rgba(255,255,255,0.06)",
      subtle: "rgba(255,255,255,0.04)",
      focus: "#8B5CF6",
    },
    icon: {
      primary: "#F4F4F5",
      secondary: "#A1A1AA",
      muted: "#71717A",
      inverse: "#09090B",
    },
    overlay: {
      primary: "rgba(0,0,0,0.50)",
      strong: "rgba(0,0,0,0.75)",
    },
    shadow: {
      primary: "rgba(0,0,0,0.25)",
      strong: "rgba(0,0,0,0.45)",
    },
  },
} as const;

// Types
// ============================================================
export type ThemeMode = keyof typeof themeColors;
export type ThemeColors = typeof themeColors.light;
export type ThemeGroup = keyof ThemeColors;

// Section Key Types
// ============================================================
export type BackgroundColors = keyof ThemeColors["background"];
export type TextColors = keyof ThemeColors["text"];
export type AccentColors = keyof ThemeColors["accent"];
export type StatusColors = keyof ThemeColors["status"];
export type BorderColors = keyof ThemeColors["border"];
export type IconColors = keyof ThemeColors["icon"];
export type OverlayColors = keyof ThemeColors["overlay"];
export type ShadowColors = keyof ThemeColors["shadow"];
