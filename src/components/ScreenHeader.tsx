import { Text, View } from "react-native";

type Props = {
  title: string
}
export function ScreenHeader({ title}: Props){
  return (
    <View className="justify-center items-center bg-gray-600 pb-6 pt-20">
      <Text className="text-gray-100 text-xl font-heading">
        {title}
      </Text>
    </View>
  )
}