import {
  FlightOfferDataProps,
  SearchFlightDataProps,
} from '@/types/home/home.types'
import DepartureDate from '@components/protected/home/DepartureDate'
import Header from '@components/protected/home/Header'
import LocationInput from '@components/protected/home/location-input'
import { TripOption } from '@components/protected/home/trip-option'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const [isPending, setIsPending] = useState(false)
  const [pageNavigation, setPageNavigation] = useState('oneWay')
  const [flightOfferData, setFlightOfferData] = useState<FlightOfferDataProps>({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10,
  })

  const [searchFlightData, setSearchFlightData] =
    useState<SearchFlightDataProps>({
      originCity: '',
      destinationCity: '',
      departureDate: '',
      seat: 0,
    })
  const [selectedDate, setSelectedDate] = useState<any>(new Date())
  const { top } = useSafeAreaInsets()

  const handleNavigationChange = (type: string) => {
    setPageNavigation(type)
  }

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
      {/* Header */}
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

      {/* Form Area */}
      <View className='w-full mx-4 px-4 -mt-32'>
        <View className='bg-white rounded-3xl pt-2 pb-4 shadow-md shadow-slate-300'>
          <View className='flex-row justify-between w-full px-4 py-2'>
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
            />
          </View>

          {/* Departure City Input */}
          <LocationInput
            icon={
              <FontAwesome5 name='plane-departure' size={20} color='gray' />
            }
            placeholder={
              searchFlightData.originCity
                ? searchFlightData.originCity
                : 'Departure City'
            }
            value=''
            onPress={() => router.push('/departure')}
          />

          {/* Destination City Input */}
          <LocationInput
            icon={<FontAwesome5 name='plane-arrival' size={20} color='gray' />}
            placeholder={
              searchFlightData.destinationCity
                ? searchFlightData.destinationCity
                : 'Destination City'
            }
            value=''
            onPress={() => {}}
          />

          {/* Departure Date Input */}
          <DepartureDate
            icon={<FontAwesome5 name='calendar-alt' size={20} color='gray' />}
            placeholder={
              selectedDate && selectedDate.length > 0
                ? selectedDate.replace(/^"|"$/g, '')
                : 'Departure Date'
            }
            value={searchFlightData.departureDate.replace(/^"|"$/g, '')}
            onPress={() => {}}
          />

          {/* Seat Input */}
          <View className='border-2 border-gray-300 rounded-2xl mx-4 mb-4 justify-center flex-row items-center pl-4 py-1'>
            <View>
              <MaterialCommunityIcons
                name='seat-passenger'
                size={20}
                color='gray'
              />
            </View>
            <TextInput
              className='w-[85%] px-4 text-base font-semibold'
              placeholder='Seat'
              keyboardType='numeric'
              value={searchFlightData.seat.toString()}
              onChangeText={(text) => {
                const seatValue = parseInt(text, 10)

                const validSeatValue = isNaN(seatValue) ? 0 : seatValue

                setSearchFlightData((prev) => ({
                  ...prev,
                  seat: validSeatValue,
                }))

                setFlightOfferData((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }))
              }}
            />
          </View>

          {/* Search Button */}
          <View className='w-full justify-start pt-2 px-4 mt-4'>
            <Pressable
              onPress={() => {}}
              className='bg-[#12B3A8] rounded-lg  justify-center items-center py-4'
            >
              <Text className='text-white text-lg font-bold'>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
