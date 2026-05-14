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

export const colors = {
  light: {
    background: {
      primary: "#FFFFFF",
      secondary: "#F8FAFC",
      tertiary: "#F1F5F9",
      surface: "#FFFFFF",
      surfaceElevated: "#FFFFFF",
      card: "#FFFFFF",
      cardMuted: "#F8FAFC",
      selected: "#EEF2FF",
      disabled: "#E5E7EB",
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
      soft: "#F3E8FF",
      subtle: "#EDE9FE",
    },
    status: {
      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#2563EB",
    },
    border: {
      primary: "#E2E8F0",
      secondary: "#CBD5E1",
      subtle: "#F1F5F9",
      focus: "#7C3AED",
    },
    icon: {
      primary: "#334155",
      secondary: "#64748B",
      muted: "#94A3B8",
      inverse: "#FFFFFF",
    },
    overlay: {
      primary: "rgba(15, 23, 42, 0.45)",
      strong: "rgba(15, 23, 42, 0.72)",
    },
    shadow: {
      primary: "rgba(15, 23, 42, 0.08)",
      strong: "rgba(15, 23, 42, 0.16)",
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

export type ThemeMode = keyof typeof colors;
export type ThemeColors = typeof colors.light;
export type ThemeColorsKeys = keyof typeof colors.light;
