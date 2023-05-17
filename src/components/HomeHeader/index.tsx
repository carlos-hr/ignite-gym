import { UserAvatar } from "@components/UserAvatar";
import { HStack, Heading, Text, VStack } from "native-base";

export function HomeHeader() {
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserAvatar alt="user profile image" size={16} mr={4} />

      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          User
        </Heading>
      </VStack>
    </HStack>
  );
}
