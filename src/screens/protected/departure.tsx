import { apiToken } from '@/api/api'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Airport {
  id: string
  name: string
  iataCode: string
}

export default function Departure() {
  const [searchInput, setSearchInput] = useState('')
  const [autoCompleteResults, setAutoCompleteResults] = useState<Airport[]>([])

  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const debounceTimerRef = useRef<number | null>(null)

  const autoCompleteSearch = useCallback(async (searchValue: string) => {
    if (!searchValue.trim()) {
      setAutoCompleteResults([])
      return
    }

    try {
      const headers = {
        Authorization: `Bearer ${apiToken}`,
      }

      const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${searchValue}`

      const response = await axios.get(url, { headers })

      setAutoCompleteResults(response.data.data)
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        console.log('Rate limit exceeded. Please try again later.')
      }

      console.error(error)
    }
  }, [])

  const handleInputSearch = useCallback(
    (value: string) => {
      setSearchInput(value)

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        autoCompleteSearch(value)
      }, 500)
    },
    [autoCompleteSearch]
  )

  return (
    <View className='flex-1 items-center bg-[#F5F7FA]'>
      <View className='w-full h-full'>
        <View
          className='justify-start border-orange-600 w-full bg-[#192031] relative pb-8'
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingTop: top,
          }}
        >
          {/* Header */}
          <View className='flex-row justify-start px-2'>
            <Pressable
              onPress={() => router.back()}
              className='flex-row items-center justify-center h-14 w-[20%]'
            >
              <View className='rounded-full bg-gray-500 h-10 w-10 justify-center items-center'>
                <MaterialIcons
                  name='keyboard-arrow-left'
                  size={30}
                  color='white'
                />
              </View>
            </Pressable>

            <View className='w-[60%] justify-center items-center flex-row'>
              <Text className='text-white text-lg font-extrabold'>
                Select Departure
              </Text>
            </View>

            <View className='w-[20%] justify-center items-center flex-row'>
              <View>
                <MaterialCommunityIcons
                  name='dots-horizontal'
                  size={30}
                  color='white'
                />
              </View>
            </View>
          </View>
        </View>

        {/* Airports or City Search */}
        <View className='w-full py-4 px-4 relative'>
          <View className='flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden'>
            <View className='w-full h-full justify-center'>
              <TextInput
                placeholder='Search for airports or cities'
                placeholderTextColor={'gray'}
                value={searchInput}
                onChangeText={handleInputSearch}
                className='bg-transparent text-gray-600 h-full px-2 capitalize'
              />
            </View>
          </View>

          {/* Auto Complete Results */}
          {autoCompleteResults.length > 0 && (
            <View className='border-2 border-gray-400 rounded-xl bg-white shadow-sm mt-4'>
              <FlatList
                data={autoCompleteResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    className='px-2 py-2 rounded-xl my-1'
                    onPress={() => {}}
                  >
                    <Text className='text-gray-500 capitalize'>
                      {item.name} ({item.iataCode})
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
