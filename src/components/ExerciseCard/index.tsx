import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export function ExerciseCard() {
  return (
    <TouchableOpacity>
      <HStack
        p={2}
        pr={4}
        mb={3}
        rounded="md"
        bg="gray.500"
        alignItems="center"
      >
        <Image
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="center"
          alt="Imagem do exercício"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
