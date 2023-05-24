import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, Heading, Text, VStack, SectionList } from "native-base";

export function History() {
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
  ];

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        px={8}
        sections={DATA}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          DATA.length === 0 && { flex: 1, justifyContent: "center" }
        }
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.
          </Text>
        )}
      />
      <HistoryCard />
    </VStack>
  );
}
