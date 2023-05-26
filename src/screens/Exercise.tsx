import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/types";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
  const { goBack } = useNavigation<AppNavigatorRoutesProps>();

  return (
    <VStack flex={1}>
      <ScrollView>
        <VStack px={8} bg="gray.600" pt={12}>
          <TouchableOpacity onPress={goBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack
            justifyContent="space-between"
            mt={4}
            mb={8}
            alignItems="center"
          >
            <Heading color="gray.100" fontSize="lg" flexShrink={1}>
              Puxada frontal
            </Heading>

            <HStack alignItems="center">
              <BodySvg />

              <Text color="gray.200" textTransform="capitalize" ml={1}>
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <VStack p={8}>
          <Image
            w="full"
            h={80}
            alt="Nome do exercício"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              justifyContent="space-around"
              alignItems="center"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />

                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />

                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
