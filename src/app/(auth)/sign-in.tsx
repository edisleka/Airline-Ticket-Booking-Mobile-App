import { useOnboardingStore } from '@store/onboarding-store'
import { Button, Text, View } from 'react-native'

export default function SignInScreen() {
  const { completeOnboarding } = useOnboardingStore()
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-xl font-bold text-blue-500'>Sign In Screen</Text>
      <Button
        title='Reset Onboarding'
        onPress={() => completeOnboarding(false)}
      />
    </View>
  )
}
