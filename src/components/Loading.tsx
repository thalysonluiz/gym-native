import { ActivityIndicator, View } from "react-native";

export function Loading(){
  return (
    <View className="flex-1 bg-slate-50 justify-center items-center">
      <ActivityIndicator className="color-slate-800" size={"large"} />
    </View>
  )
}