import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { setDay } from 'actions/HomeScene'

// array dates
import Settings from '_appSetup/Settings'

const DateListComponent = props => {
  return (
    <TouchableOpacity
      style={
        props.selectedDay === props.day
          ? styles.todayWrapper
          : styles.wrapper
      }
      onPress={() => setDay(props.day)}
    >
      <Text
        text={props.day.getDate()}
        style={
          props.selectedDay === props.day
            ? styles.numberToday
            : styles.day
        }
        allowStyles
      />
      <Text
        text={props.today ? 'Today' : Settings.DAYS_WEEK_NAME_ARRAY[props.day.getDay()]}
        style={
          props.selectedDay === props.day ? styles.dayToday : styles.notToday
        }
        allowStyles
      />
      {(props.selectedDay != props.day) &&
        <View style={styles.containerSvg}>
          <Image
            source={props.icon}
            style={styles.img}
            resizeMode={'center'}
          />
        </View>
      }
    </TouchableOpacity>
  )
}

const MapStateToProps = state => {
  const moodArrayAllDays = []
  // get all entries of moods for calendar
  for (let x in state.Entries) {
    for (let y in state.Entries[x]) {
      if (state.Entries[x][y] && state.Entries[x][y].type == 'MOOD') {
        moodArrayAllDays.push(state.Entries[x][y])
      }
    }
  }
  return {
    token: state.Session.token,
    selectedDay: state.HomeScene.selectedDay,
  }
}

export default connect(
  MapStateToProps,
)(DateListComponent)

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: theme.spacing(0.6),
    marginRight: theme.spacing(0.6),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(0.3),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: 65,
    height: 65,
  },
  todayWrapper: {
    marginLeft: theme.spacing(0.6),
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
    alignItems: 'center',
    padding: theme.spacing(0.3),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: 65,
    height: 65,
  },
  containerSvg: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  day: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  notToday: {
    color: 'white',
    marginTop: -5,
  },
  numberToday: {
    fontFamily: 'Montserrat-Bold',
    color: '#3F42A7',
  },
  dayToday: {
    color: '#2D2F88',
  },
})
