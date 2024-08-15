import { HomeHeader } from "@components/HomeHeader";
import { Text, View } from "react-native";

export function Home() {
  return (
    <View className="flex-1">
      <HomeHeader />
      <Text>Home</Text>
    </View>
  )
}