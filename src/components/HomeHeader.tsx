import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from "./UserPhoto";
import { colors } from "@/styles/colors";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

export function HomeHeader(){
  const {user, signOut} = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <View className="flex-row bg-gray-600 pt-16 pb-5 px-8 items-center">
      <UserPhoto 
        size={64} 
        source={user.avatar ? {
          uri: user.avatar, 
        } : defaultUserPhotoImg}
        alt="foto pessoal"
      />
      <View className="flex-1">
        <Text className="text-gray-100 text-base">Olá,</Text>
        <Text className="text-gray-100 font-heading text-xl">{user.name}</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut}>
        <MaterialIcons name="logout" size={28} color={colors.gray[200]} />
      </TouchableOpacity>
    </View>
  )
}