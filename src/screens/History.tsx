import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryByDayDTO } from '@dtos/history';
import { useError } from '@hooks/useError';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { Heading, Text, VStack, SectionList } from 'native-base';
import { useCallback, useState } from 'react';

export function History() {
  const [history, setHistory] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showError } = useError();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/history');
      setHistory(data);
    } catch (error) {
      showError(error, 'Não foi possível carregar o histórico');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          px={8}
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            history.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          renderSectionHeader={({ section: { title } }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
              {title}
            </Heading>
          )}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda.
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
