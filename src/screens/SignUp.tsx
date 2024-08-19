import { Image, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export function SignUp() {
  const navigation = useNavigation()

  const { control, 
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormDataProps>()

  function handleLogin(){
    navigation.goBack()
  }

  function handleSignUp(data: FormDataProps){}

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
      <Text className="text-white text-xl font-heading mb-6">Crie sua conta</Text>
      
      <Controller
        control={control}
        name="name"
        rules={{
          required: "O nome é obrigatório",
          minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres" },
        }}
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='Nome' 
            onChangeText={onChange}
            value={value}
          />
        ) } />

        <Text className="text-white">
          {errors.name?.message}
        </Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "O e-mail é obrigatório",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "E-mail inválido"
          },
        }}
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='E-mail' 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
          />
        ) } />
      
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value }}) => (
          <Input 
        placeholder='Senha'
        secureTextEntry
        onChangeText={onChange}
        value={value}
      />
        ) } />
      <Controller
        control={control}
        name="password_confirm"
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='Confirme a Senha'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            onSubmitEditing={handleSubmit(handleSignUp)}
            returnKeyType="send"
          />
        ) } />
      
      
      <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
      <View className="mt-24 w-full items-center">
        
        <Button title="Voltar para login" variant="outline" onPress={handleLogin} />
      </View>
    </View>
    </ScrollView>
  )
}