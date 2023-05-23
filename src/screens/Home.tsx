import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, Text, VStack, FlatList, HStack, Heading } from "native-base";
import { useState } from "react";
import { WORKOUT_GROUPS } from "@constants/groups";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  // const [groups, setGroups] = useState(WORKOUT_GROUPS);
  const [groupSelected, setGroupSelected] = useState(WORKOUT_GROUPS[0]);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={WORKOUT_GROUPS}
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
        maxH={10}
        my={10}
        horizontal
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" alignItems="center" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="md">
            4
          </Text>
        </HStack>

        <ExerciseCard />
        <ExerciseCard />
      </VStack>
    </VStack>
  );
}
