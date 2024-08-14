import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
}
export function Button({title, ...rest}: Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: '100%'}}
      {...rest}
    >
      <View className="w-full h-14 bg-green-700 justify-center items-center rounded-md">
        <Text className="text-white font-heading text-sm">{title}</Text>
      </View>
    </TouchableOpacity>
  )
}