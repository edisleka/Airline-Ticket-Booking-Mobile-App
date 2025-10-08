export interface TripOptionsProps {
  pageNavigation: string
  handleNavigationChange: (page: string) => void
}

export interface LocationInputProps {
  icon: React.ReactNode
  placeholder: string
  value: string
  onPress: () => void
}

export interface SearchFlightDataProps {
  originCity: string
  destinationCity: string
  departureDate: string
  seat: number
}

export interface DepartureDateProps {
  icon: React.ReactNode
  placeholder: string
  value: string
  onPress: () => void
}

export interface FlightOfferDataProps {
  originLocationCode: string
  destinationLocationCode: string
  departureDate: Date
  returnDate: Date
  adults: number
  maxResults: number
}
