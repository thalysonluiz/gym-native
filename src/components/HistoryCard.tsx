import { HistoryDTO } from '@dtos/HistoryDTO';
import { Text, View } from 'react-native';

type Props = {
  data: HistoryDTO
}
export function HistoryCard({ data }: Props) {
  return (
    <View className='flex-row w-full bg-gray-600 px-5 py-4 mb-3 rounded-md items-center justify-between' >
      <View className='flex-1 mr-5'>
        <Text className='text-white text-base capitalize font-heading'>{data.group}</Text>
        <Text className='text-gray-100 text-lg' numberOfLines={1}>{data.name}</Text>
      </View>
      <Text className='text-gray-300 text-base'>{data.hour}</Text>
    </View>
  );
}