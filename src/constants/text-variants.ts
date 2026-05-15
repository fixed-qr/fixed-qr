export const textVariants = {
  headingLarge: {
    fontSize: 32,
    lineHeight: 40,
  },
  headingMedium: {
    fontSize: 24,
    lineHeight: 32,
  },
  headingSmall: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
  },
} as const;

export type TextVariant = keyof typeof textVariants;
