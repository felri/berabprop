import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Settings from '_appSetup/Settings'
import Stack from 'navigation/stack/StackNavigator'

import { MoodBar } from './MoodBar'

import { Text, DateUtils } from 'lib'
import { theme } from '_appSetup/Theme'

import add from 'assets/images/add.png'

import monsterNegative from 'assets/images/difficulties/monster-negative.png'
import monster0 from 'assets/images/difficulties/monster-0.png'
import monster1 from 'assets/images/difficulties/monster-1.png'
import monster2 from 'assets/images/difficulties/monster-2.png'
import monster3 from 'assets/images/difficulties/monster-3.png'
import monster4 from 'assets/images/difficulties/monster-4.png'

const Bar = (props) => {

  function goScreen(name, passProps) {
    const context = { props: { componentId: 'Home.Home' } }
    const title = `${new Date().setHours(0, 0, 0, 0) == props.selectedDay.setHours(0, 0, 0, 0) ?
      'Today' :
      Settings.DAYS_WEEK_NAME_ARRAY[props.selectedDay.getDay()]}, ${props.selectedDay.getDate()} ${Settings.MONTHS[props.selectedDay.getMonth()]}`
    Stack.pushDataEntryScreen(context, name, title, { passProps })
  }

  const relevantEntry = props.entries.find(e => e.timeOfDay == props.timeOfDay)
  let color
  if (relevantEntry) {
    if (relevantEntry.severity == 0) color = theme.colors.difficulties.darkGreen
    if (relevantEntry.severity == 1) color = theme.colors.difficulties.lightGreen
    if (relevantEntry.severity == 2) color = theme.colors.difficulties.lightPink
    if (relevantEntry.severity == 3) color = theme.colors.difficulties.darkPink
    if (relevantEntry.severity == 4) color = theme.colors.difficulties.red
  }

  return (
    <TouchableOpacity style={styles.addImageContainer} onPress={() => goScreen('DataEntry.Difficulties', props.timeOfDay)}>
      {relevantEntry ?
        (<MoodBar mood={`${(relevantEntry.severity + 1) * 20}`} color={color} />) : (
          <Image source={add} style={theme.img} resizeMode={'center'} />
        )}
    </TouchableOpacity>
  )
}

const DifficultiesSingle = (props) => {
  const { entries } = props

  let maxSev = -1
  entries.forEach(e => {
    maxSev = Math.max(e.severity, maxSev)
  })

  let monster = { description: 'No entry', icon: monsterNegative }
  if (maxSev == 0) monster = { description: 'None', icon: monster0 }
  if (maxSev == 1) monster = { description: 'Mild', icon: monster1 }
  if (maxSev == 2) monster = { description: 'Moderate', icon: monster2 }
  if (maxSev == 3) monster = { description: 'Severe', icon: monster3 }
  if (maxSev == 4) monster = { description: 'Unbearable', icon: monster4 }

  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 2 }}>
        <Text text={props.name} allowStyles style={styles.descText} />
        <Text text={monster.description} allowStyles style={styles.descText} />
        <View style={theme.row}>

          {[...Array(Math.max(maxSev, 0))].map((e, i) => (
            <Image source={monster.icon} style={styles.monster} key={i} />
          ))}

          {[...Array(Math.min(4 - maxSev, 4))].map((e, i) => (
            <Image source={monsterNegative} style={styles.monster} key={i} />
          ))}

        </View>
      </View>
      <View style={{ flex: 3 }}>
        <View style={styles.buttonWrapper}>
          <Bar selectedDay={props.selectedDay} timeOfDay={'am'} entries={entries} />
          <Bar selectedDay={props.selectedDay} timeOfDay={'mid'} entries={entries} />
          <Bar selectedDay={props.selectedDay} timeOfDay={'pm'} entries={entries} />
          <Bar selectedDay={props.selectedDay} timeOfDay={'late'} entries={entries} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...theme.row,
    padding: theme.spacing(1),
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
  },
  descText: {
    margin: theme.spacing(1),
    marginBottom: 0,
  },
  buttonWrapper: {
    ...theme.row,
    justifyContent: 'space-around',
  },
  addImageContainer: {
    height: 90,
    width: 40,
  },
  monster: {
    width: 16,
    height: 16,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
})

function MapStateToProps(state, ownProps) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    selectedDay,
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'DIFFICULTY' &&
      e.name == ownProps.name
    ) : [],
  }
}

export default connect(MapStateToProps)(DifficultiesSingle)
