import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormDataProps = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const {signIn} = useAuth()

  const { control, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>()

  async function handleSignIn({email, password}: FormDataProps){
    try {
      setIsLoading(true)
      await signIn(email, password)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      Alert.alert(title)
    }
    finally {
      setIsLoading(false)
    }
  }

  function handleNewAccount(){
    navigation.navigate('signUp')
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <View className="flex-1 items-center px-10 pb-16">
      <Image 
        source={BackgroundImg} 
        defaultSource={BackgroundImg}
        className="absolute top-0" 
        resizeMode="contain"
        alt="Pessoas treinando em bicicleta"
      />
      <View className="my-24">
        <LogoSvg />
        <Text className="text-gray-100 text-sm">Treine sua mente e o seu corpo</Text>
      </View>
      <Text className="text-white text-xl font-heading mb-6">Acesse sua conta</Text>
      
      <Controller
        control={control}
        name="email"
        rules={{
          required: "E-mail é obrigatório",
        }}
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='E-mail' 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Senha é obrigatória",
        }}
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='Senha'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button 
        title="Acessar" 
        onPress={handleSubmit(handleSignIn)} 
        isLoading={isLoading}
      />
      <View className="mt-24 w-full items-center">
        <Text className="text-gray-100 text-sm mb-3 font-body">Ainda não tem acesso?</Text>
        <Button title="Criar Conta" variant="outline" onPress={handleNewAccount} />
      </View>
    </View>
    </ScrollView>
  )
}