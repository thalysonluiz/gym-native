import { Text, TouchableOpacity, View, TouchableOpacityProps, Image } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { colors } from "@/styles/colors";

type Props = TouchableOpacityProps

export function ExerciseCard({...rest}: Props){
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
        <Image 
          source={{uri: "https://www.oxerbrasil.com.br/wp-content/uploads/2022/07/mulher-se-exercitando-lrQPTQs7nQQ-unsplash.jpg"}}   
          alt="Imagem exercicio"   
          className="w-16 h-16 rounded-md mr-4"  
          resizeMode="center"
        />
        <View className="flex-1">
          <Text className="text-white text-lg font-heading">Remada</Text>
          <Text className="text-gray-200 text-sm font-body" numberOfLines={2}>Duration: 30 minutes</Text>
        </View>
        <Entypo name="chevron-thin-right" color={colors.gray[300]} /> 
      </View>
    </TouchableOpacity>
  )
}