import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Departure() {
  const [searchInput, setSearchInput] = useState('')
  const [autoCompleteResults, setAutoCompleteResults] = useState([])

  const { top } = useSafeAreaInsets()
  const router = useRouter()

  const handleInputSearch = (value: string) => {
    setSearchInput(value)
  }

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
