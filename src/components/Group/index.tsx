import { Text } from "native-base";
import { GroupProps } from "./types";

export function Group({ name }: GroupProps) {
  return (
    <Text
      color="gray.200"
      textTransform="uppercase"
      fontSize="xs"
      fontWeight="bold"
    >
      {name}
    </Text>
  );
}
