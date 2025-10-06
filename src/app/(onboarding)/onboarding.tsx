import { COLORS, TYPOGRAPHY } from '@/constants/app.constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useOnboardingStore } from '@store/onboarding-store'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

export default function OnboardingScreen() {
  const logoScale = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const subtitleOpacity = useSharedValue(0)
  const buttonScale = useSharedValue(0)
  const { top, bottom } = useSafeAreaInsets()
  const { completeOnboarding } = useOnboardingStore()

  const handleCompleteOnboarding = () => {
    completeOnboarding(true)
    console.log('completeOnboarding pressed')
  }

  useEffect(() => {
    // Animate logo entrance
    logoScale.value = withDelay(
      200,
      withSpring(1, { damping: 15, stiffness: 150 })
    )

    // Animate title
    titleOpacity.value = withDelay(
      600,
      withSpring(1, { damping: 20, stiffness: 100 })
    )

    // Animate subtitle
    subtitleOpacity.value = withDelay(
      1000,
      withSpring(1, { damping: 20, stiffness: 100 })
    )

    // Animate button
    buttonScale.value = withDelay(
      1400,
      withSpring(1, { damping: 15, stiffness: 150 })
    )
  }, [logoScale, titleOpacity, subtitleOpacity, buttonScale])

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      {
        translateY: interpolate(titleOpacity.value, [0, 1], [30, 0]),
      },
    ],
  }))

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [
      {
        translateY: interpolate(subtitleOpacity.value, [0, 1], [20, 0]),
      },
    ],
  }))

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  return (
    <LinearGradient
      colors={[
        COLORS.background.primary,
        COLORS.background.secondary,
        COLORS.dark[900],
      ]}
      locations={[0, 0.6, 1]}
      className='flex-1'
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {/* Background decorative elements */}
      <View className='absolute inset-0'>
        {/* Floating circles */}
        <Animated.View
          className='absolute w-32 h-32 bg-primary-500/10 rounded-full'
          style={{
            top: height * 0.1,
            right: -width * 0.15,
          }}
          entering={FadeInUp.duration(1000).delay(800)}
        />
        <Animated.View
          className='absolute w-20 h-20 bg-accent-blue/20 rounded-full'
          style={{
            bottom: height * 0.3,
            left: -width * 0.1,
          }}
          entering={FadeInUp.duration(1200).delay(1000)}
        />
        <Animated.View
          className='absolute w-16 h-16 bg-primary-400/15 rounded-full'
          style={{
            top: height * 0.4,
            right: width * 0.05,
          }}
          entering={FadeInUp.duration(800).delay(1200)}
        />
      </View>

      <View className='flex-1 justify-between'>
        {/* Header Section */}
        <View className='flex-1 justify-center items-center'>
          {/* Logo Section */}
          <View className='items-center mb-12 px-6'>
            <Animated.View style={logoAnimatedStyle}>
              <View className='relative'>
                <LinearGradient
                  colors={[
                    COLORS.primary[500],
                    COLORS.primary[600],
                    COLORS.accent.blue,
                  ]}
                  className='w-20 h-20 rounded-3xl items-center justify-center mb-4'
                  style={{
                    shadowColor: COLORS.primary[500],
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 16,
                  }}
                >
                  <MaterialCommunityIcons
                    name='airplane-takeoff'
                    size={32}
                    color='white'
                  />
                </LinearGradient>

                {/* Glow effect */}
                <View className='absolute inset-0 w-20 h-20 rounded-3xl bg-primary-500/30 blur-xl' />
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(600).delay(400)}
              className='flex-row items-center gap-2'
            >
              <Text className='text-white text-3xl font-bold mb-1'>BETTER</Text>
              <Text
                className='text-3xl font-bold italic'
                style={{ color: COLORS.accent.blue }}
              >
                FLY
              </Text>
            </Animated.View>
          </View>

          {/* Main Content */}
          <View className='items-center max-w-sm px-6'>
            <View className='mb-6'>
              <Animated.View style={titleAnimatedStyle}>
                <Text
                  className='text-center text-4xl font-bold leading-tight mb-2'
                  style={{
                    color: COLORS.neutral[50],
                    fontSize: TYPOGRAPHY.fontSize['4xl'],
                    lineHeight:
                      TYPOGRAPHY.lineHeight.tight * TYPOGRAPHY.fontSize['4xl'],
                  }}
                >
                  Your Journey
                </Text>
                <Text
                  className='text-center text-4xl font-bold leading-tight'
                  style={{
                    color: COLORS.primary[400],
                    fontSize: TYPOGRAPHY.fontSize['4xl'],
                    lineHeight:
                      TYPOGRAPHY.lineHeight.tight * TYPOGRAPHY.fontSize['4xl'],
                  }}
                >
                  Starts Here
                </Text>
              </Animated.View>
            </View>

            <View className='mb-12'>
              <Animated.View style={subtitleAnimatedStyle}>
                <Text
                  className='text-center leading-relaxed'
                  style={{
                    color: COLORS.neutral[300],
                    fontSize: TYPOGRAPHY.fontSize.lg,
                    lineHeight:
                      TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.lg,
                  }}
                >
                  Book flights effortlessly with our smart search engine.
                  Compare prices, find the best deals, and travel the world with
                  confidence.
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Bottom Section */}
        <View className='space-y-6 px-6 flex-col gap-2'>
          {/* CTA Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable
              className='overflow-hidden rounded-2xl'
              style={{
                shadowColor: COLORS.primary[500],
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 16,
              }}
              onPress={handleCompleteOnboarding}
            >
              <LinearGradient
                colors={[
                  COLORS.primary[500],
                  COLORS.primary[600],
                  COLORS.accent.blue,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='py-4 px-8'
              >
                <Text
                  className='text-center font-bold'
                  style={{
                    color: 'white',
                    fontSize: TYPOGRAPHY.fontSize.lg,
                    letterSpacing: 0.5,
                  }}
                >
                  Start Exploring
                </Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>

          {/* Sign In Link */}
          <Animated.View
            className='flex-row justify-center items-center'
            entering={FadeInUp.duration(600).delay(1800)}
          >
            <Text
              className='mr-2'
              style={{
                color: COLORS.neutral[400],
                fontSize: TYPOGRAPHY.fontSize.base,
              }}
            >
              Already flying with us?
            </Text>
            <Pressable>
              <Text
                className='font-semibold'
                style={{
                  color: COLORS.primary[400],
                  fontSize: TYPOGRAPHY.fontSize.base,
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  )
}
