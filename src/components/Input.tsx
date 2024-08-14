import { TextInput, TextInputProps } from 'react-native';

export function Input({...rest}: TextInputProps) {
  return (
    <TextInput
      className='w-full rounded-md bg-gray-700 h-14 px-4 mb-4 border-0 font-body text-white text-base focus:border-green-500 focus:border-2'
      placeholderTextColor={'#7C7C8A'}
      {...rest} 
    />
  )
}

