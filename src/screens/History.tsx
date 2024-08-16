import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";
import { SectionList, Text, View } from "react-native";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.22",
      data: ["puxada", "barra"]
    },
    {
      title: "27.08.22",
      data: ["puxada"]
    }
  ])

  return (
    <View className="flex-1">
      <ScreenHeader title='Histórico de Exercícios' />

      <SectionList 
        sections={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <HistoryCard />}
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