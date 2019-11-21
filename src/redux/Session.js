import { AsyncStorage } from 'react-native'

const initialState = {
  isLoggedIn: undefined,
  profileId: null,
  isServiceProvider: false,
  token: '',
}

export const Session = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const token = action.token ? action.token : newState.token
      newState.token = token
      newState.isLoggedIn = true
      newSession(token)
      return newState
    case 'RECEIVE_OWN_PROFILE':
      newState.profileId = action.data.id
      newState.isServiceProvider = action.data.is_service_provider
      return newState
    case 'LOGOUT':
      newState = initialState
      removeSession()
      return newState
    default:
      return state
  }
}

const newSession = async (token) => {
  try {
    await AsyncStorage.setItem('@Session:token', token)
  } catch (err) {
    error('[newSession]', err)
  }
}

const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('@Session:token')
    await AsyncStorage.removeItem('@Session:serverType')
  } catch (err) {
    error('[removeSession]', err)
  }
}
