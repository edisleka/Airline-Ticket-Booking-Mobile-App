import Header from '@components/protected/Header'
import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const [isPending, setIsPending] = useState(false)
  const { top } = useSafeAreaInsets()
  return (
    <View className='flex-1 items-center relative bg-[#F5F7FA]'>
      {isPending && (
        <View className='absolute z-50 w-full h-full justify-center items-center'>
          <View className='bg-[#000000] bg-opacity-50 w-full h-full justify-center items-center opacity-[0.45]'></View>
          <View className='absolute'>
            <ActivityIndicator size='large' color='#ffffff' />
          </View>
        </View>
      )}
      <View
        className='h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative'
        style={{
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingTop: top,
        }}
      >
        <Header />
      </View>
    </View>
  )
}
