import '@root/global.css'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const showOnboarding = true
  const showAuth = false
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
