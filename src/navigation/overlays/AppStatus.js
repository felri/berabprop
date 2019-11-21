/* eslint-disable */
import { store } from 'redux/_root'
import { Navigation } from 'react-native-navigation'

let overlayRef = null

function showAppStatusOverlay() {
  if (!overlayRef) {
    Navigation.showOverlay({
      component: {
        id: 'Overlays.AppStatus',
        name: 'Overlays.AppStatus',
      },
    }).then(res =>
      overlayRef = res
    )
  } else {
    info('Tried showAppStatusOverlay but already exists', overlayRef)
  }
}

function hideAppStatusOverlay() {
  Navigation.dismissOverlay(overlayRef).then(e => {
    if (e) {
      overlayRef = null
    }
  })
}

function setStatusAction(activity, fullscreen) {
  store.dispatch({ type: 'SET_APP_ACTIVITY_STATUS', activity, fullscreen })
}

let doneTimer = null

function clearTimer() {
  if (doneTimer) {
    clearTimeout(doneTimer)
  }
}

function clearOverlay() {
  if (overlayRef) {
    hideAppStatusOverlay()
  }
  setStatusAction(null)
}

function set(activity, fullscreen) {
  clearTimer()
  if (activity == 'done') {
    showAppStatusOverlay()
    setStatusAction(activity, fullscreen)
    doneTimer = setTimeout(() => clearOverlay(), 1500)
  } else if (activity) {
    showAppStatusOverlay()
    setStatusAction(activity, fullscreen)
  } else {
    clearOverlay()
  }
}

export default {
  set,
}
