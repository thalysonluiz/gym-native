import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Text, View } from "react-native";

export function Home() {
  const [groups, setGroups] = useState(['costa', 'bíceps', 'tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('costa')

  return (
    <View className="flex-1">
      <HomeHeader />

      
      <View className="flex-row">
        <Group 
          name="costa" 
          isActive={groupSelected === 'costa'}
          onPress={() => setGroupSelected('costa')}
        />
        <Group 
          name="ombro" 
          isActive={groupSelected === 'ombro'} 
          onPress={() => setGroupSelected('ombro')}
        />
      </View>
    </View>
  )
}