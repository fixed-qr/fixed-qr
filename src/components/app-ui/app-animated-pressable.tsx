import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

interface ScalePressProps extends PressableProps {
  scaleTo?: number;
  springConfig?: WithSpringConfig;

  /**
   * Style for the Animated.View wrapper
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppAnimatedPressable({
  children,
  scaleTo = 0.96,
  springConfig,
  containerStyle,
  onPressIn,
  onPressOut,
  style,
  ...props
}: Readonly<ScalePressProps>) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn: PressableProps["onPressIn"] = (event) => {
    scale.value = withSpring(scaleTo, springConfig);
    onPressIn?.(event);
  };

  const handlePressOut: PressableProps["onPressOut"] = (event) => {
    scale.value = withSpring(1, springConfig);
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Pressable
        {...props}
        style={(state) => [
          styles.base,
          typeof style === "function" ? style(state) : style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});
