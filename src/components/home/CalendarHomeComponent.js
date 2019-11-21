import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { theme } from '_appSetup/Theme'
import { setDay } from 'actions/HomeScene'
import { DateUtils } from 'lib'

import DateListComponent from 'components/home/DateListComponent'

// images
import moodOne from 'assets/images/moods/moodOne.png'
import moodTwo from 'assets/images/moods/moodTwo.png'
import moodThree from 'assets/images/moods/moodThree.png'
import moodFour from 'assets/images/moods/moodFour.png'
import moodFive from 'assets/images/moods/moodFive.png'

const moods = [moodFive, moodFour, moodThree, moodTwo, moodOne]

const CalendarHomeComponent = props => {
  const scrollRef = useRef(null)
  const [calendar, setCalendar] = useState()

  useEffect(() => {
    const x = DateUtils.setCalendar()
    setCalendar(x)
    setDay(x[x.length - 1])
    setTimeout(() => {
      try {
        scrollRef.current.scrollToEnd({ animated: true })
      } catch (error) { }
    }, 100)
  }, [])

  function getAverageOfDay(item) {
    let sum = 0
    const arrayForComparison = []
    let day = new Date(item).setHours(0, 0, 0, 0)
    for (let i = 0; i < props.entries.length; i++) {
      if (day === new Date(props.entries[i].date).setHours(0, 0, 0, 0)) {
        arrayForComparison.push(props.entries[i])
        sum += parseInt(props.entries[i].mood, 10)
      }
    }
    sum = sum / arrayForComparison.length
    let icon = getIcon(sum)
    return icon
  }

  function getIcon(avg) {
    return avg <= 2 ? 0 : avg <= 4 ? 1 : avg <= 6 ? 2 : avg <= 8 ? 3 : avg > 8 ? 4 : undefined
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
      >
        {calendar &&
          calendar.length &&
          calendar.map((day, index) => {
            const icon = getAverageOfDay(day)
            return (
              <DateListComponent
                day={day}
                icon={moods[icon]}
                key={index}
                today={index + 1 == calendar.length}
              />
            )
          })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#2D2F88',
    height: 180,
    paddingTop: theme.spacing(3),
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
})

function MapStateToProps(state) {
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
    entries: moodArrayAllDays,
  }
}

export default connect(MapStateToProps)(CalendarHomeComponent)
