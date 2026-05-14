export const textVariants = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
  },

  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },

  button: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
} as const;

export type TextVariant = keyof typeof textVariants;
