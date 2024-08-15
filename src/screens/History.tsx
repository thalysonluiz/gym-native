import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Text, View } from "react-native";

export function History() {
  return (
    <View className="flex-1">
      <ScreenHeader title='Histórico de Exercícios' />
      <HistoryCard />
    </View>
  )
}