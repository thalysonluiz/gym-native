import { Text, TouchableOpacity, View, TouchableOpacityProps, Image } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { colors } from "@/styles/colors";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({data, ...rest}: Props){
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
        <Image 
          source={{uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}   
          alt="Imagem exercicio"   
          className="w-16 h-16 rounded-md mr-4"  
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-white text-lg font-heading">{data.name}</Text>
          <Text className="text-gray-200 text-sm font-body" numberOfLines={2}>{`${data.series} séries x ${data.repetitions} repetições`}</Text>
        </View>
        <Entypo name="chevron-thin-right" color={colors.gray[300]} /> 
      </View>
    </TouchableOpacity>
  )
}