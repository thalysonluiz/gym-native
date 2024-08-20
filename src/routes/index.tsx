import { View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { colors } from "@/styles/colors";
import { useAuth } from "@hooks/useAuth";

export function Routes(){
  const { user } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}