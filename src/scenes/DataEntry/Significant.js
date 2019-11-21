import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Text, DateUtils } from 'lib'
import { connect } from 'react-redux'
import Stack from 'navigation/stack/StackNavigator'
import { Navigation } from 'react-native-navigation'
import { theme } from '_appSetup/Theme'

import badIcon from 'assets/images/significantEvents/bad.png'
import neutralIcon from 'assets/images/significantEvents/neutral.png'
import goodIcon from 'assets/images/significantEvents/good.png'

import moodOne from 'assets/images/moods/moodOne.png'
import moodTwo from 'assets/images/moods/moodTwo.png'
import moodThree from 'assets/images/moods/moodThree.png'
import moodFour from 'assets/images/moods/moodFour.png'
import moodFive from 'assets/images/moods/moodFive.png'

const MoodAvg = (props) => {
  const { avg } = props
  let meta = { icon: moodThree, color: '#ccc' }
  if (avg >= 0) meta = { icon: moodFive, color: theme.colors.mood.orange }
  if (avg >= 2) meta = { icon: moodFour, color: theme.colors.mood.orange }
  if (avg >= 4) meta = { icon: moodThree, color: theme.colors.mood.yellow }
  if (avg >= 6) meta = { icon: moodTwo, color: theme.colors.mood.lightGreen }
  if (avg >= 8) meta = { icon: moodOne, color: theme.colors.mood.darkGreen }
  const text = avg >= 0 ? (Math.round(avg * 10) / 10).toFixed(1) : 'None'
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={meta.icon} style={styles.moodIcon}/>
      <Text text={text} allowStyles style={[styles.moodAvgText, { color: meta.color }]}/>
    </View>
  )
}

const Entry = (props) => {
  const { sentiment, date, description } = props.data

  const calcAvgMoodXDaysAfter = (x) => {
    let relevantMoods = []
    props.moodEntries.forEach(m => {
      const daysBetween = DateUtils.daysBetweenDates(DateUtils.YYYYMMDDtoTimestamp(date), m.date)
      if (daysBetween >= 0 && daysBetween < x) relevantMoods.push(m.mood)
    })
    if (relevantMoods.length == 0) return -1

    const averageMood = relevantMoods.reduce(function(a, b) { return a + b }) / relevantMoods.length
    return averageMood
  }

  let meta = { icon: goodIcon, color: '#3BB7B0' }
  if (sentiment == 'NEUTRAL') meta = { icon: neutralIcon, color: '#9CA7BA' }
  if (sentiment == 'BAD') meta = { icon: badIcon, color: '#FF8787' }

  const daysAgo = DateUtils.daysBetweenDates(DateUtils.YYYYMMDDtoTimestamp(date), new Date())
  let daysAgoLabel = `${DateUtils.YYYYMMDDtoHuman(date)} `
  if (daysAgo == 0) daysAgoLabel += '(today)'
  if (daysAgo == 1) daysAgoLabel += '(yesterday)'
  if (daysAgo > 1) daysAgoLabel += `(${daysAgo} days ago)`

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.eventWrapper}>
        <View style={{ flex: 3 }}>
          <View style={styles.descriptionRow}>
            <Image source={meta.icon} style={styles.sentimentIcon}/>
            <Text text={description} allowStyles style={{ color: meta.color }}/>
          </View>
          <Text text={daysAgoLabel}/>
        </View>

        <View style={styles.moodsWrapper}>
          <MoodAvg avg={calcAvgMoodXDaysAfter(30)}/>
          <MoodAvg avg={calcAvgMoodXDaysAfter(60)}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

class SignificantEventsList extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.goToInput = this.goToInput.bind(this)
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'check') {
      Navigation.popTo('Home.Home')
    }
  }

  goToInput(edited = null) {
    const context = { props: { componentId: 'Home.Home', edited: edited } }
    const name = 'DataEntry.SignificantEventsInput'
    const title = 'Significant events'
    Stack.pushDataEntryScreen(context, name, title, { edited })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>

          <Text text={'Average mood within “x” days after event'} allowStyles style={styles.dayWarningLabel}/>
          <View style={theme.row}>
            <View style={{ flex: 3 }}/>
            <View style={styles.dayPeriodLabelWrapper}>
              <Text text={'30 d'}/>
              <Text text={'60 d'}/>
            </View>
          </View>

          <View style={styles.entriesWrapper}>
            {this.props.entries.map((e, index) => <Entry key={index} data={e} moodEntries={this.props.moodEntries} onPress={() => this.goToInput(e)}/>)}
          </View>

        </ScrollView>

        <TouchableOpacity style={styles.addEventButton} onPress={() => this.goToInput()}>
          <Text text={'Add Event'} allowStyles style={styles.addEventButtonText}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  addEventButton: {
    ...theme.row,
    ...theme.center,
    backgroundColor: theme.colors.topMenu.light,
    height: 50,
    borderRadius: 25,
    margin: theme.spacing(2),
  },
  addEventButtonText: {
    color: 'white',
  },
  dayWarningLabel: {
    alignSelf: 'flex-end',
    margin: theme.spacing(2),
  },
  dayPeriodLabelWrapper: {
    flex: 2,
    ...theme.row,
    justifyContent: 'space-around',
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  eventWrapper: {
    ...theme.row,
    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  entriesWrapper: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  descriptionRow: {
    ...theme.row,
    marginBottom: theme.spacing(0.5),
  },
  sentimentIcon: {
    width: 17,
    height: 17,
    marginRight: theme.spacing(1),
  },
  moodsWrapper: {
    flex: 2,
    ...theme.row,
    justifyContent: 'space-around',
  },
  moodIcon: {
    width: 18,
    height: 18,
    marginBottom: theme.spacing(0.5),
  },
  moodAvgText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
})

const MapStateToProps = state => {
  let eventEntries = []
  let moodEntries = []
  for (let date in state.Entries) {
    state.Entries[date].forEach(e => {
      if (e.type == 'SIGNIFICANT_EVENT') eventEntries.push({ ...e, date })
      if (e.type == 'MOOD') moodEntries.push({ ...e, date: DateUtils.YYYYMMDDtoTimestamp(date) })
    })
  }
  eventEntries.sort((a, b) => b.date - a.date)
  return {
    entries: eventEntries,
    moodEntries,
  }
}

export default connect(MapStateToProps)(SignificantEventsList)

