import '@root/global.css'
import { useOnboardingStore } from '@store/onboarding-store'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const { hasCompletedOnboarding } = useOnboardingStore()
  // console.log('hasCompletedOnboarding', hasCompletedOnboarding)

  const showOnboarding = !hasCompletedOnboarding
  const showAuth = hasCompletedOnboarding
  const showProtected = false

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={showOnboarding}>
        <Stack.Screen name='(onboarding)' />
      </Stack.Protected>

      <Stack.Protected guard={showAuth}>
        <Stack.Screen name='(auth)' />
      </Stack.Protected>

      <Stack.Protected guard={showProtected}>
        <Stack.Screen name='(protected)' />
      </Stack.Protected>
    </Stack>
  )
}
