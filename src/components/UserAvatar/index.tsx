import { Image } from "native-base";
import { UserAvatarProps } from "./types";

export function UserAvatar({ size, ...rest }: UserAvatarProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}
