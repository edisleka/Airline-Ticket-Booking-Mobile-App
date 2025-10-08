import { DepartureDateProps } from '@/types/home/home.types'
import { Pressable, Text, View } from 'react-native'

export default function DepartureDate({
  icon,
  placeholder,
  value,
  onPress,
}: DepartureDateProps) {
  return (
    <Pressable
      onPress={onPress}
      className='border-2 border-gray-300 rounded-2xl mx-4 mb-4 justify-center py-4 flex-row items-center pl-4'
    >
      <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>

      <View className='w-[85%] px-4 items-start justify-start'>
        <Text className='bg-transparent font-bold text-gray-600'>
          {value || placeholder}
        </Text>
      </View>
    </Pressable>
  )
}
