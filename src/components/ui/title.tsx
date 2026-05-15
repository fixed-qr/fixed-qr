import { ThemedText, ThemedTextProps } from "./themed-text";

interface TitleProps extends ThemedTextProps {
  children: string;
}

export function Title({ children, ...rest }: TitleProps) {
  return <ThemedText {...rest}>{children}</ThemedText>;
}
