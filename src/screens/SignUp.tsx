import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@services/api";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const FormValidationSchema = z.object({
  name: z.string({message: "Nome é obrigatório"}).min(3, {message: "Nome mínima de 3 caracteres"}),
  email: z.string({message: "E-mail é obrigatório"}).email({message: "E-mail inválido"}),
  password: z.string({message: "Senha é obrigatória"}).min(6, {message: "Senha mínima de 6 caracteres"}),
  password_confirm: z.string({message: "Confirmação de Senha obrigatória"}),
})
.refine(({ password_confirm, password }) => password === password_confirm, {
    message: "Senhas não conferem",
    path: ["password_confirm"]
  }  
);

export function SignUp() {
  const navigation = useNavigation()

  const { control, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(FormValidationSchema),
  })

  function handleLogin(){
    navigation.goBack()
  }

  async function handleSignUp({name, email, password}: FormDataProps){
    try {
      const response = await api.post('/users', {name, email, password})
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      Alert.alert(title)
    }
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
      <Text className="text-white text-xl font-heading mb-6">Crie sua conta</Text>
      
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='Nome' 
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
          />
        ) } />

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value }}) => (
          <Input 
            placeholder='E-mail' 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
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
            errorMessage={errors.password?.message}
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
            errorMessage={errors.password_confirm?.message}
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