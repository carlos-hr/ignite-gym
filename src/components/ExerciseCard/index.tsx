import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ExerciseCardProps } from './types';
import { api } from '@services/api';

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
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
          resizeMode="cover"
          alt="Imagem do exercício"
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
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
