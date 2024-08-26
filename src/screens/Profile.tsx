import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import * as ImagePicker from "expo-image-picker"
import Toast from 'react-native-toast-message';

import { useAuth } from "@hooks/useAuth";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirm: string;
}

const FormValidationSchema = z.object({
  password: z.string({message: "Senha é obrigatória"}).min(6, {message: "Senha mínima de 6 caracteres"}),
  password_confirm: z.string({message: "Confirmação de Senha obrigatória"}),
})
.refine(({ password_confirm, password }) => password === password_confirm, {
    message: "Senhas não conferem",
    path: ["password_confirm"]
  }  
);

const PHOTO_SIZE = 130
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/thalysonluiz.png')

  const { user } = useAuth()

  const { control, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(FormValidationSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    }
  })

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

          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value }}) => (
              <Input 
                style={{backgroundColor: '#202024'}} 
                placeholder="Nome" 
                onChangeText={onChange}
                value={value}
              />
            )} 
          />

          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value }}) => (
              <Input 
                style={{backgroundColor: '#202024', color: '#7C7C8A'}} 
                value={value} 
                editable={false} 
                selectTextOnFocus={false} 
                onChangeText={onChange}
              />
            )} 
          />
          
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