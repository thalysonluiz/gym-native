import { useCallback, useEffect, useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Text, View } from "react-native";
import { ExerciseCard } from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(){
    navigation.navigate('exercise')
  }

  async function fetchGroups(){
    try {
      const {data} = await api.get('/groups')
      setGroups(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos. Tente novamente mais tarde.'
    }
  }

  async function fetchExercisesByGroup(){
    try {
      const {data} = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError? error.message : 'Não foi possível carregar os exercícios. Tente novamente mais tarde.'
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

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
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
          }
          contentContainerClassName="pb-20"
        />
      </View>
      
    </View>
  )
}