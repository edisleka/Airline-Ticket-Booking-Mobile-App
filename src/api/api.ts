import axios from 'axios'

export const apiToken = 'a6903GHBlbGEGft1oEAX1OKhSGr0'
export const apiBaseUrl =
  'https://test.api.amadeus.com/v2/shopping/flight-offers'

const clientId = '14ChLNmLqdZfbLj6YFM4kQRePT1RSCDk'
const clientSecret = 'dHx5A5ddp5FhR2KN'

let newApiToken = ''

const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    newApiToken = response.data.access_token
    console.log('The new Access Token is: ', newApiToken)
  } catch (error) {
    console.error(error)
  }
}

getNewAccessToken()
