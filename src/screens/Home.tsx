import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Text, View } from "react-native";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState(['costa', 'bíceps', 'tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('costa')

  return (
    <View className="flex-1">
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Group 
          name={item}
          isActive={groupSelected === item}
          onPress={() => setGroupSelected(item)}
        />}
        contentContainerClassName="px-8"
        className="my-10 max-h-10"
      />
      <View className="flex-1 px-8">

        <View className="flex-row justify-between mb-5">
          <Text className="text-gray-200 font-heading text-base">
            Exercícios
          </Text>
          <Text className="text-gray-200 font-heading text-sm">
            4
          </Text>
        </View>
        <ExerciseCard />
      </View>
      
    </View>
  )
}