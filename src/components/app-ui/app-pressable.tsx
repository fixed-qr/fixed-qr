import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AppPressableProps extends PressableProps {
  scaleTo?: number;
  springConfig?: WithSpringConfig;
}

interface AppPressableState extends PressableStateCallbackType {
  focused: boolean;
}

export function AppPressable({
  children,
  scaleTo = 0.96,
  springConfig,
  onPressIn,
  onPressOut,
  style,
  ...props
}: Readonly<AppPressableProps>) {
  const scale = useSharedValue(1);

  const [state, setState] = React.useState<AppPressableState>({
    pressed: false,
    hovered: false,
    focused: false,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    setState((prev) => ({
      ...prev,
      pressed: true,
    }));

    scale.value = withSpring(scaleTo, springConfig);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setState((prev) => ({
      ...prev,
      pressed: false,
    }));

    scale.value = withSpring(1, springConfig);
    onPressOut?.(event);
  };

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={(e) => {
        setState((prev) => ({
          ...prev,
          hovered: true,
        }));

        props.onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        setState((prev) => ({
          ...prev,
          hovered: false,
        }));

        props.onHoverOut?.(e);
      }}
      onFocus={(e) => {
        setState((prev) => ({
          ...prev,
          focused: true,
        }));

        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setState((prev) => ({
          ...prev,
          focused: false,
        }));

        props.onBlur?.(e);
      }}
      style={[
        typeof style === "function" ? style(state) : style,
        animatedStyle,
      ]}
    >
      {typeof children === "function" ? children(state) : children}
    </AnimatedPressable>
  );
}
