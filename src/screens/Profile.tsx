import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker"
import Toast from 'react-native-toast-message';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 130
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/thalysonluiz.png')

  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (!photoSelected.canceled) {    
        if(photoSelected.assets[0].fileSize && (photoSelected.assets[0].fileSize / 1024 / 1024) > 5) {
          Toast.show({
            type: 'error',
            text1: 'Imagem não atualizada',
            text2: 'Maior que 5mb'
          });
          return
        }
        setUserPhoto(photoSelected.assets[0].uri)        
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }

  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <View className="justify-center items-center mt-6 px-10">
          <UserPhoto 
            size={PHOTO_SIZE} 
            source={{
              uri: userPhoto, 
            }}
            alt="foto pessoal"
          />
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 font-heading mt-2 mb-8">
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input style={{backgroundColor: '#202024'}} placeholder="Nome" />
          <Input style={{backgroundColor: '#202024'}} value="Email" editable={false} selectTextOnFocus={false} />
        </View>
        <View className="px-10 mt-12 mb-9">
            <Text className="text-gray-200 font-heading text-base mb-2">
              Alterar senha
            </Text>
            <Input style={{backgroundColor: '#202024'}} placeholder="Senha atual" secureTextEntry />
            <Input style={{backgroundColor: '#202024'}} placeholder="Nova senha" secureTextEntry />
            <Input style={{backgroundColor: '#202024'}} placeholder="Confirma nova senha" secureTextEntry />
            <Button title="Atualizar" />
        </View>
      </ScrollView>
    </View>
  )
}