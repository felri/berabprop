import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TabView } from 'lib'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theme } from '_appSetup/Theme'

import FoodInputs from './FoodInputs'

import amWhite from 'assets/images/food/am-white.png'
import midWhite from 'assets/images/food/mid-white.png'
import pmWhite from 'assets/images/food/pm-white.png'

class Food extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'check') {
      Navigation.popTo('Home.Home')
    }
  }

  render() {
    let initialPage = 0
    if (this.props.passProps == 'mid') initialPage = 1
    if (this.props.passProps == 'pm') initialPage = 2
    return (
      <TabView
        initialPage={initialPage}>
        <FoodInputs time='am' tabLabel='am'/>
        <FoodInputs time='mid' tabLabel='mid'/>
        <FoodInputs time='pm' tabLabel='pm'/>
      </TabView>
    )
  }
}

const styles = StyleSheet.create({
})

const MapStateToProps = state => {
  return {
  }
}

export default connect(MapStateToProps)(Food)

