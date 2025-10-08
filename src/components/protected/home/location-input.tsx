import { LocationInputProps } from '@/types/home/home.types'
import { Pressable, Text, View } from 'react-native'

export default function LocationInput({
  icon,
  placeholder,
  value,
  onPress,
}: LocationInputProps) {
  return (
    <View className='border-2 border-gray-300 rounded-2xl mx-4 mb-4 justify-center'>
      <Pressable onPress={onPress}>
        <View className='px-4 flex-row items-center justify-between'>
          <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>
          <View className='w-[85%] py-3 pl-4'>
            {value ? (
              <Text className='bg-transparent font-bold text-gray-600'>
                {value}
              </Text>
            ) : (
              <Text className='bg-transparent text-lg font-semibold text-gray-600'>
                {placeholder}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  )
}
