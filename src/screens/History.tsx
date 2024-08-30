import { useCallback, useState } from "react";
import { Alert, SectionList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "@services/api";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";
import { HistoryGroupByDayDTO } from "@dtos/HistoryGroupByDayDTO";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([])

  async function fetchExerciseHistory(){
    try {
      setIsLoading(true)
      const { data } = await api.get(`/history`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'
      Alert.alert(title)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchExerciseHistory()
  }, []))

  return (
    <View className="flex-1">
      <ScreenHeader title='Histórico de Exercícios' />

      <SectionList 
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HistoryCard data={item} />}
        renderSectionHeader={({section}) => (
          <Text className="text-gray-200 text-base font-heading mt-10 mb-3">{section.title}</Text>
        )}
        className="px-8"
        contentContainerStyle={exercises.length === 0 && {flex: 1, alignItems: 'center', justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <Text className="text-gray-100 text-base font-body text-center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
      />
      
    </View>
  )
}