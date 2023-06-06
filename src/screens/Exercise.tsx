import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/types';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';
import { useError } from '@hooks/useError';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/exercise';
import { Loading } from '@components/Loading';

interface RouteParams {
  id: string;
}

export function Exercise() {
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDTO | null>(
    null
  );
  const [isSubmitingExercise, setIsSubmitingExercise] = useState(false);

  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { showError } = useError();
  const { params } = useRoute();
  const { show } = useToast();

  const { id } = params as RouteParams;

  async function fetchExerciseDetail() {
    try {
      const { data } = await api.get(`/exercises/${id}`);
      setExerciseDetail(data);
    } catch (error) {
      showError(error, 'Não foi possível carregar o exercício');
    }
  }

  async function handleCompleteExercise() {
    try {
      await api.post('/history/', {
        exercise_id: id,
      });

      show({
        title: 'Parabéns, exercício concluído!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('history');
    } catch (error) {
      showError(error, 'Não foi possível submeter o exercício');
    } finally {
      setIsSubmitingExercise(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetail();
  }, [id]);

  return (
    <VStack flex={1}>
      {exerciseDetail ? (
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
              <Heading
                color="gray.100"
                fontSize="lg"
                flexShrink={1}
                fontFamily="heading"
              >
                {exerciseDetail.name}
              </Heading>

              <HStack alignItems="center">
                <BodySvg />

                <Text color="gray.200" textTransform="capitalize" ml={1}>
                  {exerciseDetail.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <VStack p={8}>
            <Box overflow="hidden" rounded="lg" mb={3}>
              <Image
                h={80}
                alt="Nome do exercício"
                resizeMode="cover"
                rounded="lg"
                w="full"
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetail.demo}`,
                }}
              />
            </Box>

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
                    {exerciseDetail.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />

                  <Text color="gray.200" ml={2}>
                    {exerciseDetail.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                onPress={handleCompleteExercise}
                isLoading={isSubmitingExercise}
              />
            </Box>
          </VStack>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
