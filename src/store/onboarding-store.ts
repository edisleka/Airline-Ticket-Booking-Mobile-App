import { deleteItemAsync, getItem, setItem } from 'expo-secure-store'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface OnboardingState {
  hasCompletedOnboarding: boolean
  completeOnboarding: (hasCompletedOnboarding: boolean) => void
}

export const useOnboardingStore = create(
  persist<OnboardingState>(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: (hasCompletedOnboarding: boolean) =>
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding,
          }
        }),
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
)
