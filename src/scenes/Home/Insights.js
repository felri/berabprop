import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import AppStatus from 'navigation/overlays/AppStatus'
import { Text } from 'lib'
import { Navigation } from 'react-native-navigation'

import Stack from 'navigation/stack/StackNavigator'
import { theme } from '_appSetup/Theme'

export default class InsightsPage extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      pose: 'init',
    }
  }

  navigationButtonPressed({ buttonId }) {
    alert(buttonId)
  }

  componentDidMount() {
    AppStatus.set(null)
  }

  static get options() {
    return Stack.getTitleObj('Insights')
  }

  render() {
    return (
      <View
      >
        <Text text={'Insights'} />

      </View>
    )
  }
}

const styles = StyleSheet.create({

})
