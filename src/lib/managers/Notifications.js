import { AsyncStorage, AppState } from 'react-native'
import firebase from 'react-native-firebase'
import Modal from 'navigation/overlays/Modal'
import Notifications from 'actions/Notifications'
import { Navigation } from 'react-native-navigation'
import TabRegistry from 'navigation/tab/TabRegistry'
import BackgroundTimer from 'react-native-background-timer'

async function checkPermissions() {
  const enabled = true // await firebase.messaging().hasPermission()
  if (enabled) {
    info('Notifications', 'user has permissions')
    initNotifications()
  } else {
    const initialized = await AsyncStorage.getItem('@AppStatus:initialized')
    info('Notifications', "user doesn't have permission")
    if (initialized) {
      askPermission()
    } else {
      // Modal.open('Notifications.Permission', { type: 'ask' })
    }
  }
}

async function askPermission() {
  try {
    await firebase.messaging().requestPermission()
    info('Notifications', 'User has authorised')
    Modal.close()
  } catch (err) {
    info('Notifications', 'User has rejected permissions')
    const initialized = await AsyncStorage.getItem('@AppStatus:initialized')
    if (initialized) {
      // Modal.open('Notifications.Permission', { type: 'settings' })
    } else {
      Modal.close()
    }
  }
  await AsyncStorage.setItem('@AppStatus:initialized', 'true')
}

async function initNotifications() {
  const fcmToken = await firebase.messaging().getToken()
  if (fcmToken) {
    Notifications.registerDevice(fcmToken)
  } else {
    warn('User does not have device token yet')
  }
  firebase.messaging().onTokenRefresh(token => Notifications.registerDevice(token))
  const initialNotification = await firebase.notifications().getInitialNotification()
  if (initialNotification) {
    openPushNotification(initialNotification)
  }
  firebase.notifications().onNotification(notif => receivePushNotification(notif))
  firebase.notifications().onNotificationOpened(notif => openPushNotification(notif))
  // AppState.addEventListener('change', handleAppStateChange)
}

function receivePushNotification(notif) {
  info('notif', notif)
  const data = notif._data
  info('data', data)
}

function openPushNotification(notif) {
  info('notif', notif)
  const extra_data = notif._data
  Navigation.mergeOptions('Notifications.List', {
    bottomTabs: {
      currentTabIndex: TabRegistry.NOTIFICATIONS_TAB_INDEX,
    },
  })
  Notifications.open({ extra_data })
}

function handleAppStateChange(state) {
  if (state == 'background') {
    BackgroundTimer.runBackgroundTimer(() => {
      Notifications.updateBadge(0)
      Notifications.markReceived(() => {
        BackgroundTimer.stopBackgroundTimer()
        BackgroundTimer.stop()
      })
    },
    2000)
  } else if (state == 'active') {
    Notifications.fetch()
  }
}

export default {
  checkPermissions,
  askPermission,
}
