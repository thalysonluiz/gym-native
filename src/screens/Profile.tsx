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
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirm: string;
}

const FormValidationSchema = z.object({
  name: z.string({message: "Nome é obrigatório"}).min(3, {message: "Nome mínimo de 3 caracteres"}),
  password: z.string({message: "Senha é obrigatória"}).optional().transform(val => val !== undefined && val !== '' ? val : null),
  old_password: z.string({message: "Senha é obrigatória"}).optional().transform(val => val !== undefined && val !== '' ? val : null),
  password_confirm: z.string({message: "Confirmação de Senha obrigatória"}).optional().transform(val => val !== undefined && val !== '' ? val : null),
})
.superRefine(({password, password_confirm}, ctx) => {
  if (password !== null && password.length < 6) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      minimum: 6,
      type: "string",
      inclusive: true,
      message: "Senha mínima de 6 caracteres",
      path: ["password"],
    });
  }

  if ((password !== null && password !== password_confirm) || (password_confirm !== null && password === null)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Senhas não conferem",
      path: ["password_confirm"],
    });
  }
});

const PHOTO_SIZE = 130
export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/thalysonluiz.png')

  const { user, updateUserProfile } = useAuth()

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

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()
        
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        }  as any
        
        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile)

        await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type':'multipart/form-data',
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }

  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)
      const userUpdated = user
      userUpdated.name = data.name

      await api.put(`/users`, data) 

      await updateUserProfile(userUpdated)

      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso!',
      });
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.'
      Alert.alert(title)
    } finally {
      setIsUpdating(false)
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
                errorMessage={errors.name?.message}
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
            <Controller
            control={control}
            name="old_password"
            render={({field: {onChange }}) => (
              <Input 
                style={{backgroundColor: '#202024'}} 
                placeholder="Senha atual" 
                onChangeText={onChange}
                secureTextEntry 
              />
            )} 
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange }}) => (
              <Input 
                style={{backgroundColor: '#202024'}} 
                placeholder="Nova senha" 
                onChangeText={onChange}
                secureTextEntry 
                errorMessage={errors.password?.message}
              />
            )} 
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({field: {onChange }}) => (
              <Input 
              style={{backgroundColor: '#202024'}} 
              placeholder="Confirma nova senha" 
              onChangeText={onChange}
              secureTextEntry 
              errorMessage={errors.password_confirm?.message}
            />
            )} 
          />
            
            <Button 
              title="Atualizar" 
              onPress={handleSubmit(handleProfileUpdate)} 
              isLoading={isUpdating}
            />
        </View>
      </ScrollView>
    </View>
  )
}