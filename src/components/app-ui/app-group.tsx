import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppIcon, AppIconProps } from "./app-icon";
import { AppText } from "./app-text";
import { AppView } from "./app-view";

export interface AppGroupProps {
  title: string;
  children: ReactNode;
  onTitlePress?: () => void;
  titleIconName?: AppIconProps["name"];
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

export const AppGroup = ({
  title,
  children,
  onTitlePress,
  titleIconName,
  titleStyle,
  containerStyle,
}: AppGroupProps) => {
  const theme = useTheme();

  return (
    <AppView>
      <Pressable style={styles.titleContainer} onPress={onTitlePress}>
        <AppText variant="bodyMedium" color="tertiary" weight="600">
          {title}
        </AppText>
        {titleIconName && (
          <AppIcon
            name={titleIconName}
            size={18}
            color={theme.text.secondary}
          />
        )}
      </Pressable>
      <AppView
        style={[
          styles.groupItems,
          {
            backgroundColor: theme.background.secondary,
            borderColor: theme.border.primary,
          },
          containerStyle,
        ]}
      >
        {children}
      </AppView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  appGroup: {},
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 8,
  },
  groupItems: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
  },
});
