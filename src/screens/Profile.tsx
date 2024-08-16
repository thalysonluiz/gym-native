import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const PHOTO_SIZE = 130
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <View className="justify-center items-center mt-6 px-10">
          <UserPhoto 
            size={PHOTO_SIZE} 
            source={{
              uri: 'https://github.com/thalysonluiz.png', 
            }}
            alt="foto pessoal"
          />
          <TouchableOpacity >
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