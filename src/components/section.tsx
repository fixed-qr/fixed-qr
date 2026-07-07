import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { AppIcon, AppIconProps, AppText, AppView } from "./app-ui";

export interface SectionProps {
  children: ReactNode;
  title?: string;
  onTitlePress?: () => void;
  titleIconName?: AppIconProps["name"];
  containerStyle?: ViewStyle;
}

export const Section = ({
  title,
  children,
  onTitlePress,
  titleIconName,
  containerStyle,
}: SectionProps) => {
  const theme = useTheme();

  return (
    <AppView>
      <Pressable style={styles.titleContainer} onPress={onTitlePress}>
        {title && (
          <AppText variant="bodyMedium" color="tertiary" weight="600">
            {title}
          </AppText>
        )}
        {titleIconName && (
          <AppIcon name={titleIconName} size={18} color={theme.text.tertiary} />
        )}
      </Pressable>
      <AppView style={[styles.sectionContainer, containerStyle]}>
        {children}
      </AppView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 12,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 6,
  },
});
