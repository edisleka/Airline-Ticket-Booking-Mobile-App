import { Image } from 'expo-image'
import { Text, View } from 'react-native'

const Header = () => {
  return (
    <View className='flex-row justify-between items-center px-4'>
      <View className='w-1/2 flex-row h-14 items-center'>
        <View className='pr-2'>
          <View className='overflow-hidden'>
            <Image
              source={require('@assets/images/edis_leka.jpg')}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                borderWidth: 2,
                borderColor: '#ffffff',
              }}
              contentFit='cover'
            />
          </View>
        </View>
        <View>
          <Text className='text-base text-neutral-400 font-medium'>
            Welcome Back
          </Text>
          <Text className='text-xl text-white font-bold'>Stacks 👋</Text>
        </View>
      </View>
      <View className='w-1/2 flex-row space-x-4 justify-end items-center h-14'>
        <View className='h-full px-4 justify-center flex-row items-center gap-2 rounded-full bg-gray-600'>
          <View className='bg-gray-500 w-8 h-8 justify-center items-center rounded-[32px]'>
            <Text className='text-white font-semibold'>P</Text>
          </View>
          <View className='justify-start items-start gap-1'>
            <Text className='text-base text-gray-200'>Flight Point</Text>
            <Text className='text-white'>✈️ 5,231</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Header
