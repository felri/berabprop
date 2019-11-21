import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { DateUtils, TabView } from 'lib'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theme } from '_appSetup/Theme'

import DifficultiesInputs from './DifficultiesInputs'
import { entryDifficulty } from 'actions/Entries'

class Difficulties extends Component {
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
    if (this.props.passProps == 'late') initialPage = 3

    return (
      <View style={{ flex: 1 }}>

        <TabView
          initialPage={initialPage}>
          <DifficultiesInputs timeOfDay='am' tabLabel='am'/>
          <DifficultiesInputs timeOfDay='mid' tabLabel='mid'/>
          <DifficultiesInputs timeOfDay='pm' tabLabel='pm'/>
          <DifficultiesInputs timeOfDay='late' tabLabel='late'/>
        </TabView>

        <TextInput
          value={this.props.note[0] ? this.props.note[0].severity : ''}
          onChangeText={text => entryDifficulty('NOTE', text, 'none', this.props.selectedDay)}
          class={'default'}
          multiline
          style={styles.input}
          placeholder={'Add note...'}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    margin: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing(2),
    borderWidth: 1,
    borderColor: 'rgba(25, 52, 93, 0.2)',
  },
})

const MapStateToProps = state => {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    note: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'DIFFICULTY' && e.name == 'NOTE') : [],
    selectedDay,
  }
}

export default connect(MapStateToProps)(Difficulties)

