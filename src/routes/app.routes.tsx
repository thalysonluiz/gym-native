import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg"
import HistorySvg from "@assets/history.svg"
import ProfileSvg from "@assets/profile.svg"

import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { colors } from "@/styles/colors";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined,
  history: undefined,
  exercise: undefined,
  profile: undefined,
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const iconSize = 24

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: 40,
        paddingTop: 24,
      }
    }}>
      <Screen 
        name="home" 
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HomeSvg width={iconSize} height={iconSize} fill={color} />
          )
        }}
      />
      <Screen 
        name="history" 
        component={History} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HistorySvg width={iconSize} height={iconSize} fill={color} />
          )
        }}
      />
      <Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ProfileSvg width={iconSize} height={iconSize} fill={color} />
          )
        }}
      />
      <Screen 
        name="exercise" 
        component={Exercise} 
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}