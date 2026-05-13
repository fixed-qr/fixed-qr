/**
 * ------------------------------------------------------------------
 * TOKEN GROUPS
 * ------------------------------------------------------------------
 *
 * background → Layouts, cards, surfaces, containers
 * text       → Typography hierarchy
 * accent     → Brand & interactive colors
 * status     → Success, warning, error, info
 * border     → Borders, dividers, focus states
 * icon       → Icon hierarchy
 * overlay    → Modal/sheet overlays
 * shadow     → Elevation shadows
 *
 * ------------------------------------------------------------------
 * BACKGROUND USAGE
 * ------------------------------------------------------------------
 *
 * primary          → Main app background
 * secondary        → Section/group background
 * tertiary         → Nested layout background
 * surface          → Standard UI surface
 * surfaceElevated  → Modal/sheet/popover surfaces
 * card             → Primary card background
 * cardMuted        → Muted/secondary card
 * selected         → Active/selected state
 * disabled         → Disabled background state
 *
 * ------------------------------------------------------------------
 * TEXT USAGE
 * ------------------------------------------------------------------
 *
 * primary   → Main readable text
 * secondary → Descriptions/subtitles
 * tertiary  → Metadata/supporting text
 * muted     → Placeholder/hint text
 * disabled  → Disabled/inactive text
 * inverse   → Text on accent/dark surfaces
 *
 * ------------------------------------------------------------------
 * ACCENT USAGE
 * ------------------------------------------------------------------
 *
 * primary → Primary actions/buttons/links
 * pressed → Pressed interaction state
 * soft    → Soft accent background
 * subtle  → Very subtle accent tint
 *
 * ------------------------------------------------------------------
 * STATUS USAGE
 * ------------------------------------------------------------------
 *
 * success → Success states
 * warning → Warning states
 * danger  → Error/destructive states
 * info    → Informational states
 *
 * ------------------------------------------------------------------
 * BORDER USAGE
 * ------------------------------------------------------------------
 *
 * primary  → Standard borders
 * secondary→ Stronger borders/dividers
 * subtle   → Soft separators
 * focus    → Focused/active states
 *
 * ------------------------------------------------------------------
 * ICON USAGE
 * ------------------------------------------------------------------
 *
 * primary   → Main icons
 * secondary → Secondary/inactive icons
 * muted     → Decorative icons
 * inverse   → Icons on accent surfaces
 *
 * ------------------------------------------------------------------
 * OVERLAY USAGE
 * ------------------------------------------------------------------
 *
 * primary → Standard modal overlay
 * strong  → Fullscreen/heavy overlay
 *
 * ------------------------------------------------------------------
 * SHADOW USAGE
 * ------------------------------------------------------------------
 *
 * primary → Standard elevation shadow
 * strong  → High elevation shadow
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
      secondary: "#111827",
      tertiary: "#1E293B",
      surface: "#111827",
      surfaceElevated: "#1A2234",
      card: "#141C2F",
      cardMuted: "#1E293B",
      selected: "#2E1065",
      disabled: "#1F2937",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
      tertiary: "#94A3B8",
      muted: "#64748B",
      disabled: "#475569",
      inverse: "#0F172A",
    },
    accent: {
      primary: "#7C3AED",
      pressed: "#8B5CF6",
      soft: "rgba(167, 139, 250, 0.16)",
      subtle: "rgba(167, 139, 250, 0.10)",
    },
    status: {
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#F87171",
      info: "#60A5FA",
    },
    border: {
      primary: "#243041",
      secondary: "#334155",
      subtle: "#1E293B",
      focus: "#A78BFA",
    },
    icon: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
      muted: "#64748B",
      inverse: "#0F172A",
    },
    overlay: {
      primary: "rgba(0, 0, 0, 0.50)",
      strong: "rgba(0, 0, 0, 0.75)",
    },
    shadow: {
      primary: "rgba(0, 0, 0, 0.30)",
      strong: "rgba(0, 0, 0, 0.50)",
    },
  },
} as const;

export type ThemeMode = keyof typeof colors;
export type ThemeColors = typeof colors.light;
export type ThemeColorsKeys = keyof typeof colors.light;
