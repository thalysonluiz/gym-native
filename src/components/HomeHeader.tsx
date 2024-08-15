import { Text, View } from "react-native";

export function HomeHeader(){
  return (
    <View className="flex-row bg-gray-600 pt-16 pb-5 px-8 items-center">
      <View>
      <Text className="text-gray-100 text-base">Olá,</Text>
      <Text className="text-gray-100 font-heading text-base">Rodrigo</Text>
      </View>
    </View>
  )
}