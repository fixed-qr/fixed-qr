import { Image, ImageProps } from "expo-image";

export function AppImage(props: Readonly<ImageProps>) {
  return <Image transition={200} contentFit="cover" {...props} />;
}
