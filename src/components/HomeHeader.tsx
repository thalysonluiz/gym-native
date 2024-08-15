import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from "./UserPhoto";
import { colors } from "@/styles/colors";

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
      <View className="flex-1">
        <Text className="text-gray-100 text-base">Olá,</Text>
        <Text className="text-gray-100 font-heading text-xl">Thalyson</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="logout" size={28} color={colors.gray[200]} />
      </TouchableOpacity>
    </View>
  )
}