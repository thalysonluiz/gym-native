import { View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { colors } from "@/styles/colors";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes(){
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  if (isLoadingUserStorageData) return <Loading />

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}