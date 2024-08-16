import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Text, View } from "react-native";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState(['costa', 'bíceps', 'tríceps', 'ombro'])
  const [exercises, setExercises] = useState(['costa', 'bíceps', 'tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('costa')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(){
    navigation.navigate('exercise')
  }

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
            {exercises.length}
          </Text>
        </View>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          }
          contentContainerClassName="pb-20"
        />
      </View>
      
    </View>
  )
}