import { ActivityIndicator, View } from "react-native";

export function Loading(){
  return (
    <View className="flex-1 bg-gray-700 justify-center items-center">
      <ActivityIndicator className="color-green-500" size={"large"} />
    </View>
  )
}