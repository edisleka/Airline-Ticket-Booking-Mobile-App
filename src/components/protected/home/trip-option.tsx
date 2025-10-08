import { TripOptionsProps } from '@types/home/home.types'
import { cn } from '@utils/cn'
import { Pressable, Text, View } from 'react-native'
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
} from 'react-native-heroicons/outline'

export const TripOption = ({
  pageNavigation,
  handleNavigationChange,
}: TripOptionsProps) => (
  <View className='flex-row justify-between w-full px-4 py-2'>
    <Pressable
      onPress={() => handleNavigationChange('oneWay')}
      className='flex-row w-1/2'
    >
      <View
        className={cn(
          'w-full justify-center items-center flex-row space-x-2 pb-2',
          pageNavigation === 'oneWay'
            ? 'border-b-4 border-[#12B3A8]'
            : 'border-transparent'
        )}
      >
        <ChevronDoubleRightIcon
          size={20}
          strokeWidth={pageNavigation === 'oneWay' ? 3 : 2}
          color={pageNavigation === 'oneWay' ? '#12B3A8' : 'gray'}
        />
        <Text
          className={cn(
            'text-xl pl-2',
            pageNavigation === 'oneWay' ? 'text-[#12B3A8]' : 'text-gray-500'
          )}
          style={{ fontWeight: pageNavigation === 'oneWay' ? '700' : '500' }}
        >
          One Way
        </Text>
      </View>
    </Pressable>
    <Pressable
      onPress={() => handleNavigationChange('roundTrip')}
      className='flex-row w-1/2'
    >
      <View
        className={cn(
          'w-full justify-center items-center flex-row space-x-2 pb-2',
          pageNavigation === 'roundTrip'
            ? 'border-b-4 border-[#12B3A8]'
            : 'border-transparent'
        )}
      >
        <ArrowPathRoundedSquareIcon
          size={20}
          strokeWidth={pageNavigation === 'roundTrip' ? 3 : 2}
          color={pageNavigation === 'roundTrip' ? '#12B3A8' : 'gray'}
        />
        <Text
          className={cn(
            'text-xl pl-2',
            pageNavigation === 'roundTrip' ? 'text-[#12B3A8]' : 'text-gray-500'
          )}
          style={{
            fontWeight: pageNavigation === 'roundTrip' ? '700' : '500',
          }}
        >
          Round Trip
        </Text>
      </View>
    </Pressable>
  </View>
)
