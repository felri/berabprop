import React, { Component, Fragment } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import AppStatus from 'navigation/overlays/AppStatus'
import { connect } from 'react-redux'
import Stack from 'navigation/stack/StackNavigator'
import { theme } from '_appSetup/Theme'
import { Navigation } from 'react-native-navigation'
import { persistor } from 'redux/_root'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import CalendarHomeComponent from 'components/home/CalendarHomeComponent'
import DifficultiesHomeComponent from 'components/home/DifficultiesHomeComponent'
import MoodHomeComponent from 'components/home/MoodHomeComponent'
import FactorsHomeComponent from 'components/home/FactorsHomeComponent'
import MedsHomeComponent from 'components/home/MedsHomeComponent'
import FoodHomeComponent from 'components/home/FoodHomeComponent'

// array dates
import Settings from '_appSetup/Settings'

class HomePage extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.setOpenCard = this.setOpenCard.bind(this)
    this.state = {
      pose: 'init',
      openCard: null,
    }
  }

  setOpenCard(openCard = null) {
    this.setState({ openCard })
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == 'SignificantEvents') {
      const context = { props: { componentId: 'Home.Home' } }
      const name = 'DataEntry.Significant'
      const title = 'Significant events'
      Stack.pushDataEntryScreen(context, name, title, { })
    } else {
      persistor.purge()
      AsyncStorage.clear()
      alert(buttonId)
    }
  }

  componentDidMount() {
    AppStatus.set(null)
  }

  setTitle = () => {
    // set the title bar dynamically
    Navigation.mergeOptions('Home.Home', {
      topBar: {
        title: {
          text: `${new Date().setHours(0, 0, 0, 0) == this.props.selectedDay.setHours(0, 0, 0, 0) ?
            'Today' :
            Settings.DAYS_WEEK_NAME_ARRAY[this.props.selectedDay.getDay()]}, ${this.props.selectedDay.getDate()} ${Settings.MONTHS[this.props.selectedDay.getMonth()]}`,
        },
      },
    })
  }

  componentDidUpdate() {
    this.setTitle()
  }

  static options() {
    return Stack.getTitleObj('Today,')
  }

  render() {
    const { openCard } = this.state
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
          <CalendarHomeComponent/>
          <View style={styles.container}>
            <MoodHomeComponent/>
            <DifficultiesHomeComponent open={openCard == 'Difficulties'} setOpen={this.setOpenCard}/>
            <FactorsHomeComponent open={openCard == 'Factors'} setOpen={this.setOpenCard}/>
            <MedsHomeComponent open={openCard == 'Meds/Supplements'} setOpen={this.setOpenCard}/>
            <FoodHomeComponent open={openCard == 'Food diary'} setOpen={this.setOpenCard}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const MapStateToProps = state => {
  return {
    selectedDay: state.HomeScene.selectedDay,
  }
}

export default connect(
  MapStateToProps,
)(HomePage)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    width: '100%',
    marginTop: 93,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: 20,
  },
})
