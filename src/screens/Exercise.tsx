import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { colors } from "@/styles/colors";
import { useNavigation } from "@react-navigation/native";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="px-8 pt-12 bg-gray-600">
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="arrow-left" color={colors.green[500]} size={24} />
          </TouchableOpacity>
          
          <View className="flex-row justify-between mt-4 mb-8 text-center">
            <Text className="text-gray-100 text-lg font-heading flex-shrink">
              Remada
            </Text>
            <View className="flex-row items-center">
              <BodySvg />
              <Text className="text-gray-200 ml-1 capitalize">
                Costas
              </Text>
            </View>
          </View>
        </View>

        <View className="p-8">
          <Image 
            className="w-full h-80 mb-3 rounded-lg"
            source={{uri: "https://www.oxerbrasil.com.br/wp-content/uploads/2022/07/mulher-se-exercitando-lrQPTQs7nQQ-unsplash.jpg"}}   
            alt="Imagem exercicio"
            resizeMode="cover" 
          />
          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row justify-around items-center mb-6 mt-5">
              <View className="flex-row">
                <SeriesSvg />
                <Text className="text-gray-200 ml-2 capitalize">
                  {5} séries
                </Text>
              </View>
              <View className="flex-row">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2 capitalize">
                  {3} repetições
                </Text>
              </View>

            </View>
              <Button title="Marcar como realizado" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}