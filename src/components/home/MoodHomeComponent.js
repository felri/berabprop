import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils, HomeEntryCard } from 'lib'
import { theme } from '_appSetup/Theme'
import Stack from 'navigation/stack/StackNavigator'
import { MoodBar } from 'components/home/MoodBar'
import Settings from '_appSetup/Settings'
import { removeMood } from 'actions/Entries'

// images
import add from 'assets/images/add.png'

const NUMBER_DAYS_MOOD_ENTRY = 7

const MoodHomeComponent = (props) => {
  const [average, setAverage] = useState(0)
  const [averageColor, setAverageColor] = useState('black')

  useEffect(() => {
    if (props.entries) {
      let avg = 0
      for (let item in props.entries) {
        avg += parseInt(props.entries[item].mood, 10)
      }
      avg = avg / props.entries.length
      let avgColor = avg <= 2 ? theme.colors.mood.pink :
        avg <= 4 ? theme.colors.mood.orange :
          avg <= 6 ? theme.colors.mood.yellow :
            avg <= 8 ? theme.colors.mood.lightGreen : theme.colors.mood.darkGreen
      setAverage(avg)
      setAverageColor(avgColor)
    }
  }, [props.entries])

  function goScreen(name, passProps) {
    const context = { props: { componentId: 'Home.Home' } }
    const title = `${new Date().setHours(0, 0, 0, 0) == props.selectedDay.setHours(0, 0, 0, 0) ?
      'Today' :
      Settings.DAYS_WEEK_NAME_ARRAY[props.selectedDay.getDay()]}, ${props.selectedDay.getDate()} ${Settings.MONTHS[props.selectedDay.getMonth()]}`
    Stack.pushDataEntryScreen(context, name, title, passProps)
    if (passProps) {
      // mood exist, delete the entry
      // passProps === mood entry
      removeMood(passProps, props.selectedDay)
    }
  }

  function getColor(item) {
    const color = item.mood <= 2 ? theme.colors.mood.pink :
      item.mood <= 4 ? theme.colors.mood.orange :
        item.mood <= 6 ? theme.colors.mood.yellow :
          item.mood <= 8 ? theme.colors.mood.lightGreen : theme.colors.mood.darkGreen
    return color
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.containerCard}>
        <View style={styles.containerText}>
          <Text text={'Mood'} allowStyles class={'title'}/>
          <View style={styles.containerAvg}>
            <View style={styles.avg}>
              <Text text={'Avg'} allowStyles class={'subTitle'}/>
            </View>
            <View>
              <Text text={average ? average.toFixed(1).toString() : ''}
                allowStyles style={[styles.avgNumber, { color: average > 0 && averageColor }]}/>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerMoods}>
        {
          props.entries &&
          props.entries
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((item, index) => {
              const color = getColor(item)
              return (
                <TouchableOpacity key={index} style={styles.addImageContainer} onPress={() => goScreen('Home.Mood', item)}>
                  <MoodBar mood={`${item.mood}0`} color={color}/>
                  <View style={styles.containerTextHour}>
                    <Text text={item.hour} allowStyles style={styles.textHour}/>
                  </View>
                </TouchableOpacity>)
            }
            )
        }
        {
          props.entries.length < NUMBER_DAYS_MOOD_ENTRY &&
          <TouchableOpacity style={styles.addImageContainer} onPress={() => goScreen('Home.Mood')}>
            <Image source={add} style={theme.img} resizeMode={'center'}/>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

function MapStateToProps(state) {
  const selectedDay = Date.parse(state.HomeScene.selectedDay)
  const date = DateUtils.timestampToYYYYMMDD(selectedDay)
  return {
    token: state.Session.token,
    factors: state.UserConfig.factor,
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'MOOD') : [],
    selectedDay: state.HomeScene.selectedDay,
  }
}

export default connect(MapStateToProps)(MoodHomeComponent)


const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    // height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    marginTop: theme.spacing(3.12),
    color: theme.colors.darkBlue,
    fontSize: 14,
  },
  containerAvg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avgNumber: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: -3,
  },
  avg: {
    marginRight: theme.spacing(1),
  },
  containerCard: {
    padding: 16,
  },
  containerMoods: {
    flex: 1,
    paddingLeft: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerTextHour: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addImageContainer: {
    maxHeight: 90,
    width: 40,
    marginLeft: theme.spacing(1.25),
    marginBottom: theme.spacing(1.5),
  },
  containerText: {
    flex: 1,
    flexDirection: 'row',
  },
  textHour: {
    fontSize: 10,
    color: theme.colors.darkBlue,
  },
})

