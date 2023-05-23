import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, Text, VStack, FlatList } from "native-base";
import { useState } from "react";
import { WORKOUT_GROUPS } from "@constants/groups";

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

      <Center></Center>
    </VStack>
  );
}
