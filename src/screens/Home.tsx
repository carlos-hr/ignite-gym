import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Text, VStack, FlatList, HStack, Heading } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { ExerciseCard } from '@components/ExerciseCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/types';
import { useError } from '@hooks/useError';
import { api } from '@services/api';
import { ExerciseDTO } from '@dtos/exercise';
import { Loading } from '@components/Loading';

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { showError } = useError();

  function handleOpenExercise(id: string) {
    navigate('exercise', { id });
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups');
      setGroups(data);

      if (!groupSelected) {
        setGroupSelected(data[0]);
      }
    } catch (error) {
      showError(error, 'Não foi possível carregar os grupos musculares');
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(data);
    } catch (error) {
      showError(error, 'Não foi possível carregar os exercícios');
    }
    {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        horizontal
        maxH={10}
        minH={10}
        my={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" alignItems="center" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="md">
              4
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleOpenExercise(item.id)}
              />
            )}
            _contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  );
}
