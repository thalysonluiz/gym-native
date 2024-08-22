import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { colors } from "@/styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParams = {
  exerciseId: string,
}

export function Exercise() {
  const [exercise, setExercise] = useState({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  const route = useRoute()
  const { exerciseId } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails(){
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.'
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="px-8 pt-12 bg-gray-600">
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="arrow-left" color={colors.green[500]} size={24} />
          </TouchableOpacity>
          
          <View className="flex-row justify-between mt-4 mb-8 text-center">
            <Text className="text-gray-100 text-lg font-heading flex-shrink">
              {exercise.name}
            </Text>
            <View className="flex-row items-center">
              <BodySvg />
              <Text className="text-gray-200 ml-1 capitalize">
                {exercise.group}
              </Text>
            </View>
          </View>
        </View>

      { isLoading ? <Loading /> :
        <View className="p-8">
          <Image 
            className="w-full h-80 mb-3 rounded-lg"
            source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}   
            alt="Imagem exercício"
            resizeMode="cover" 
          />
          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row justify-around mb-6 mt-5">
              <View className="flex-row items-center">
                <SeriesSvg />
                <Text className="text-gray-200 ml-2 capitalize">
                  {exercise.series} séries
                </Text>
              </View>
              <View className="flex-row items-center">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2 capitalize">
                  {exercise.repetitions} repetições
                </Text>
              </View>

            </View>
              <Button title="Marcar como realizado" />
          </View>
        </View>
      }
      </ScrollView>
    </View>
    
  )
}