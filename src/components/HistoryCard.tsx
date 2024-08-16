import { Text, View } from 'react-native';

export function HistoryCard() {
  return (
    <View className='flex-row w-full bg-gray-600 px-5 py-4 mb-3 rounded-md items-center justify-between' >
      <View className='flex-1 mr-5'>
        <Text className='text-white text-base capitalize font-heading'>Costas</Text>
        <Text className='text-gray-100 text-lg' numberOfLines={1}>Puxada</Text>
      </View>
      <Text className='text-gray-300 text-base'>08:56</Text>
    </View>
  );
}