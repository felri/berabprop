import { store } from 'redux/_root'
import { Fetch } from 'lib'
import Stack from 'navigation/stack/StackNavigator'
import { Navigation } from 'react-native-navigation'
import firebase from 'react-native-firebase'

const MODULE_NAME = 'notifications/'

function receiveNotifications(data) {
  store.dispatch({ type: 'RECEIVE_NOTIFICATIONS', data })
}

function updateBadge(badge) {
  firebase.notifications().setBadge(badge)
  store.dispatch({ type: 'UPDATE_BADGE', badge })
  badge = badge ? String(badge) : null
  Navigation.mergeOptions('Notifications.List', {
    bottomTab: {
      badge,
    },
  })
}

async function fetch(onSuccess = () => null) {
  await Fetch({
    url: MODULE_NAME,
    method: 'GET',
    successCallback: (res) => {
      receiveNotifications(res.results)
      updateBadge(res.unread_count)
      onSuccess(res.results)
    },
  })
}

async function markReceived(onSuccess = () => null) {
  await Fetch({
    url: MODULE_NAME + 'mark_received/',
    method: 'POST',
    options: { json: false },
    successCallback: () => {
      // receiveNotifications(res.results)
      // updateBadge(res.unread_count)
      onSuccess()
    },
  })
}

async function markRead(data, onSuccess = () => null) {
  await Fetch({
    url: MODULE_NAME + 'mark_read/',
    method: 'POST',
    data: data,
    successCallback: (res) => {
      receiveNotifications(res.results)
      updateBadge(res.unread_count)
      onSuccess(res.results)
    },
  })
}

export async function registerDevice(token) {
  const data = {
    registration_id: token,
    cloud_message_type: 'FCM',
  }
  await Fetch({
    url: 'device/',
    method: 'POST',
    data: data,
  })
}

function open(item) {
  markRead({ id: item.id })
  const data = item.extra_data
  const name = data.scene
  const passProps = { object_id: data.obj_id }
  const context = { props: { componentId: 'Notifications.List' } }
  Stack.push(context, { name, passProps })
}

export default {
  registerDevice,
  fetch,
  open,
  updateBadge,
  markReceived,
  markRead,
}
