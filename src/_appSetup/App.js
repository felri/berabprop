/* eslint-disable */

// WARNING DO NOT REMOVE THESE
// loads components that *just* need to be initialised
import { Provider } from 'react-redux'
import Settings from '_appSetup/Settings'
import { logger } from 'lib/utils/logger'

// load core components
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

// load navigation components
import { registerStackComponents } from 'navigation/stack/StackRegistry'
import Tabs from 'navigation/tab/TabNavigator'
import AppStatus from 'navigation/overlays/AppStatus'

initialiseApp()

function initialiseApp() {
  Navigation.events().registerAppLaunchedListener(() => {
    Tabs.setDefaultNavSettings()
    registerStackComponents()
    Tabs.registerTabComponents()
    log('App initialised!')
    AppStatus.set('splash', true)
  })
  if (Settings.WARN_ILLEGAL_STATE_MUTATIONS) {
    info('WARN_ILLEGAL_STATE_MUTATIONS is on, Redux intensive operations may become slow')
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.nothingness}></View>
    )
  }
}

const styles = StyleSheet.create({
  nothingness: {
    flex: 1,
    backgroundColor: 'black',
  },
})
