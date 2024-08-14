import { Image, ScrollView, Text, View } from "react-native";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <View className="flex-1 items-center px-10 pb-16">
      <Image 
        source={BackgroundImg} 
        className="absolute top-0" 
        resizeMode="contain"
        alt="Pessoas treinando em bicicleta"
      />
      <View className="my-24">
        <LogoSvg />
        <Text className="text-gray-100 text-sm">Treine sua mente e o seu corpo</Text>
      </View>
      <Text className="text-white text-xl font-heading mb-6">Acesse sua conta</Text>
      <Input 
        placeholder='E-mail' 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input 
        placeholder='Senha'
        secureTextEntry
      />
      <Button title="Acessar" />
      <View className="mt-24 w-full items-center">
        <Text className="text-gray-100 text-sm mb-3 font-body">Ainda não tem acesso?</Text>
        <Button title="Criar Conta" variant="outline" />
      </View>
    </View>
    </ScrollView>
  )
}