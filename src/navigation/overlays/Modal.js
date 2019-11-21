/* eslint-disable */
import { store } from 'redux/_root'
import { Navigation } from 'react-native-navigation'

function open(component, props = {}) {
  Navigation.showModal({
    component: {
      options: {
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        layout: { backgroundColor: 'transparent' },
      },
      passProps: props,
      id: component,
      name: component,
    },
  })
  store.dispatch({ type: 'SET_MODAL', showModal: true })
}

function close() {
  store.dispatch({ type: 'SET_MODAL', showModal: false })
  setTimeout(() => {
    unmount()
  }, 200)
}

function unmount() {
  Navigation.dismissAllModals()
}

export default {
  open,
  close,
}
