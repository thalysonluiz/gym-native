import clsx from 'clsx';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  errorMessage?: string | null
}

export function Input({errorMessage = null, ...rest}: Props) {
  const isInvalid = !!errorMessage

  return (
    <View className='w-full mb-4'>
      {isInvalid && <Text className='text-red-600 text-sm mb-2'>{errorMessage}</Text>}
      <TextInput
        className={clsx(
          "w-full rounded-md bg-gray-700 h-14 px-4 border-0 font-body text-white text-base focus:border-green-500 focus:border-[1px]",
          { 
            "border-red-500 border-[1px]": isInvalid
          }
          )}
        placeholderTextColor={'#7C7C8A'}
        {...rest} 
      />
    </View>
  )
}

