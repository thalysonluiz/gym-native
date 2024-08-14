import { Image, Text, View } from "react-native";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <View className="flex-1 items-center bg-gray-700 px-10">
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
    </View>
  )
}