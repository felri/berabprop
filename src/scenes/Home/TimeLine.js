import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import AppStatus from 'navigation/overlays/AppStatus'
import { Text } from 'lib'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import { theme } from '_appSetup/Theme'

import Settings from '_appSetup/Settings'

// Cards
import { TopBarTimeline } from 'components/timeline/TopBarTimeline'
import { MoodCardTimeline } from 'components/timeline/MoodCardTimeline'
import { FactorsCardTimeline } from 'components/timeline/FactorsCardTimeline'
import { MedsCardTimeline } from 'components/timeline/MedsCardTimeline'
import { FoodCardTimeline } from 'components/timeline/FoodCardTimeline'
import { SignificantTimeline } from 'components/timeline/SignificantTimeline'
import { DifficultiesCardTimeline } from 'components/timeline/DifficultiesCardTimeline'

class TimeLinePage extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      pose: 'init',
    }
  }

  setTitle = () => {
    Navigation.mergeOptions('Home.TimeLine', {
      topBar: {
        visible: false,
      },
    })
  }

  navigationButtonPressed({ buttonId }) {
    alert(buttonId)
  }

  componentDidMount() {
    AppStatus.set(null)
    this.setTitle()
  }

  convertKeyToDate = (key) => {
    let year = key.substring(0, 4)
    let month = key.substring(4, 6)
    let day = key.substring(6, 8)
    let date = new Date(year, month - 1, day)
    return {
      day: day = date.getDate(),
      weekDay: Settings.DAYS_WEEK_NAME_ARRAY[date.getDay()],
    }
  }

  render() {
    const { entries } = this.props
    return (
      <View style={styles.container}>
        <TopBarTimeline/>
        <ScrollView nestedScrollEnabled={true}>
          {
            entries ?
              Object.keys(entries)
                .slice(0).reverse()
                .map((key, index) => {
                  const day = this.convertKeyToDate(key)

                  const mood = entries[key].filter(f => f.type === 'MOOD')
                  const factor = entries[key].filter(f => f.type === 'FACTOR')
                  const meds = entries[key].filter(f => f.type === 'MEDICATION')
                  const significant = entries[key].filter(f => f.type === 'SIGNIFICANT_EVENT')
                  const food = entries[key].filter(f => f.type === 'FOOD' || f.type === 'WATER')
                  const difficulty = entries[key].filter(f => f.type === 'DIFFICULTY')
                  const difficultyEntries = difficulty.filter(f => f.name != 'NOTE')
                  const difficultyNote = difficulty.filter(f => f.name == 'NOTE')

                  return (
                    <View style={styles.wrapper} key={index}>
                      <View style={styles.leftSideDay}>
                        <View style={styles.containerTextDays}>
                          <Text text={day.weekDay} allowStyles style={styles.dayWeek}/>
                          <Text text={day.day} allowStyles style={styles.day}/>
                        </View>
                      </View>
                      <View style={styles.entriesDay}>
                        {
                          mood.length > 0 && <MoodCardTimeline entries={mood}/>
                        }
                        {
                          factor.length > 0 && <FactorsCardTimeline entries={factor} factors={this.props.factors}/>
                        }
                        {
                          meds.length > 0 && <MedsCardTimeline entries={meds}/>
                        }
                        {
                          food.length > 0 && <FoodCardTimeline entries={food}/>
                        }
                        {
                          difficulty.length > 0 && <DifficultiesCardTimeline difficultyEntries={difficultyEntries} difficultyNote={difficultyNote}/>
                        }
                        {
                          significant.length > 0 && <SignificantTimeline entries={significant}/>
                        }
                      </View>
                    </View>
                  )
                }) :
              <View style={styles.containerTextDays}>
                <Text text={'No entries'} allowStyles style={styles.dayWeek}/>
              </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f8',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: theme.spacing(2),
  },
  entriesDay: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSideDay: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 40,
    width: 40,
  },
  containerTextDays: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1f345a',
  },
  dayWeek: {
    fontSize: 13,
    color: '#67758f',
  },
})

const MapStateToProps = state => {
  return {
    token: state.Session.token,
    selectedDay: state.HomeScene.selectedDay,
    entries: state.Entries,
    factors: state.UserConfig.factor.items,
  }
}

export default connect(
  MapStateToProps,
)(TimeLinePage)
