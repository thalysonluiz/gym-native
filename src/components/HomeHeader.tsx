import { Text, View } from "react-native";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
  return (
    <View className="flex-row bg-gray-600 pt-16 pb-5 px-8 items-center">
      <UserPhoto 
        size={64} 
        source={{
          uri: 'https://github.com/thalysonluiz.png', 
        }}
        alt="foto pessoal"
      />
      <View>
      <Text className="text-gray-100 text-base">Olá,</Text>
      <Text className="text-gray-100 font-heading text-xl">Thalyson</Text>
      </View>
    </View>
  )
}