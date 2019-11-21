import { store } from 'redux/_root'
import { AsyncStorage } from 'react-native'
import AppStatus from 'navigation/overlays/AppStatus'
import { Fetch } from 'lib'
import OSAlert from 'navigation/overlays/OSAlert'
import Tabs from 'navigation/tab/TabNavigator'

const MODULE_NAME = 'profiles/'

function loginSuccess(token) {
  store.dispatch({ type: 'LOGIN_SUCCESS', token })
  Tabs.startMainAppNavigator()
  getOwnProfile()
  // getDeviceToken()
  setTimeout(() => AppStatus.set(null), 1000)
}

function receiveProfile(data) {
  store.dispatch({ type: 'RECEIVE_PROFILE', data })
}

function receiveOwnProfile(data) {
  store.dispatch({ type: 'RECEIVE_OWN_PROFILE', data })
}

function logout() {
  Tabs.setSignupComponent()
  store.dispatch({ type: 'LOGOUT' })
}

async function tryAutoLogin() {
  const token = await AsyncStorage.getItem('@Session:token')
  if (!token) {
    info('No token found')
    return
  }
  await Fetch({
    url: MODULE_NAME + 'i',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    successCallback: (data) => {
      receiveProfile(data)
      loginSuccess(token)
      info('Auto login success')
      AppStatus.set(null)
    },
    failureCallback: () => {
      info('Auto login failure')
      logout()
      AppStatus.set(null)
    },
  })
}

async function tryLogin(data) {
  info('tryLogin', data)
  AppStatus.set('loading')
  await Fetch({
    url: 'auth/get-token/',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: data,
    successCallback: (response) => {
      const token = 'Token ' + response.token
      AppStatus.set(null)
      loginSuccess(token)
      info('Alt login successful', token)
    },
    failureCallback: () => {
      info('Alt login failure')
      AppStatus.set(null)
      const onDismiss = () => null
      OSAlert.error({ body: 'Could not login.', onDismiss })
    },
  })
}

function getOwnProfile() {
  const onSuccess = (data) => { receiveOwnProfile(data) }
  return getProfile('i', onSuccess)
}

async function getProfile(id, onSuccess = () => null) {
  await Fetch({
    url: MODULE_NAME + id,
    method: 'GET',
    successCallback: (data) => {
      receiveProfile(data)
      onSuccess(data)
    },
  })
}

async function save(id, data, onSuccess = () => null) {
  await Fetch({
    url: MODULE_NAME + id,
    method: 'PATCH',
    data: data,
    options: {
      multipart: true,
      json: true,
    },
    successCallback: (res) => {
      receiveProfile(res)
      onSuccess(res)
    },
  })
}

async function create(data, onSuccess = () => null) {
  AppStatus.set('loading')
  await Fetch({
    url: MODULE_NAME + 'create/',
    method: 'POST',
    data: data,
    options: {
      multipart: true,
      json: true,
    },
    successCallback: (res) => {
      receiveProfile(res)
      onSuccess(res)
      AppStatus.set(null)
    },
    failureCallback: () => {
      error('Error creating profile')
      AppStatus.set(null)
    },
  })
}

export function checkAvailability(email, onSuccess = () => null, onFailure = () => null) {
  const emailOk = new Promise((resolve) => {
    Fetch({
      url: 'profiles/check_email/?email=' + email,
      method: 'GET',
      successCallback: () => {
        onSuccess()
        resolve(true)
        return true
      },
      failureCallback: (response) => {
        OSAlert.error({ body: response._bodyText, onDismiss: () => null })
        onFailure()
        resolve(false)
        return false
      },
    })
  })
  return emailOk
}

function require(profiles, id) {
  if (profiles[id]) {
    return profiles[id]
  } else {
    getProfile(id)
    return null
  }
}

export default {
  checkAvailability,
  tryLogin,
  tryAutoLogin,
  getProfile,
  getOwnProfile,
  logout,
  save,
  create,
  require,
}
