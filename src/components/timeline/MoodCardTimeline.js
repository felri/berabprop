import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text, DateUtils } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

// images
import moodOne from 'assets/images/moods/moodOne.png'
import moodTwo from 'assets/images/moods/moodTwo.png'
import moodThree from 'assets/images/moods/moodThree.png'
import moodFour from 'assets/images/moods/moodFour.png'
import moodFive from 'assets/images/moods/moodFive.png'

const moods = [moodFive, moodFour, moodThree, moodTwo, moodOne]

export const MoodCardTimeline = (props) => {
  function getFeelings(entry) {
    if (entry.type === 'MOOD' && entry.feelings) {
      let feelings = entry.feelings.filter(f => f.selected)
      let result = ''
      for (let i in feelings) {
        let comma = i < feelings.length - 1 ? ', ' : ''
        result = result + feelings[i].name + comma
      }
      return result
    }
  }

  function getColor(item) {
    return item.mood <= 2 ? theme.colors.mood.pink :
      item.mood <= 4 ? theme.colors.mood.orange :
        item.mood <= 6 ? theme.colors.mood.yellow :
          item.mood <= 8 ? theme.colors.mood.lightGreen : theme.colors.mood.darkGreen
  }

  function getIcon(avg) {
    return avg <= 2 ? 0 : avg <= 4 ? 1 : avg <= 6 ? 2 : avg <= 8 ? 3 : avg > 8 ? 4 : undefined
  }

  return (
    <ContainerTimelineCard>
      {
        props.entries &&
        props.entries.length > 0 &&
        props.entries.map((entry, index) => {
          let result = getFeelings(entry)
          return (
            <View style={styles.wrapper} key={index}>
              <View style={styles.containerTopItems}>
                <View style={styles.containerImg}>
                  <Image source={moods[getIcon(entry.mood)]} style={theme.img} resizeMode={'center'} />
                </View>
                <View style={styles.entry}>
                  <Text text={entry.hour} allowStyles style={styles.hour} />
                  <View style={styles.containerFeelings}>
                    <Text text={result} allowStyles style={styles.feelings} />
                  </View>
                </View>
              </View>
              {
                entry.note &&
                <View style={styles.containerNote}>
                  <Text text={entry.note} allowStyles style={styles.note} />
                </View>
              }
              <View style={styles.containerAverage}>
                <Text text={entry.mood} allowStyles style={[styles.avgNumber, { color: getColor(entry) }]} />
              </View>
            </View>
          )
        })
      }
    </ContainerTimelineCard>
  )
}

const styles = StyleSheet.create({
  wrapper: {

  },
  containerTopItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(0.7),

  },
  containerNote: {
    marginLeft: 30,
    paddingBottom: theme.spacing(0.7),
  },
  containerImg: {
    flex: 1,
    marginLeft: -theme.spacing(2),
    height: 20,
    width: 20,
  },
  avgNumber: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: -3,
  },
  entry: {
    flex: 4,
    flexDirection: 'row',
    paddingRight: 30,
    paddingTop: theme.spacing(0.2),
    justifyContent: 'flex-start',

  },
  feelings: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1f345a',
  },
  containerAverage: {
    flex: 1,
    position: 'absolute',
    top: -theme.spacing(0.3),
    right: 0,
  },
  containerFeelings: {
    flex: 1,
    flexDirection: 'column',
    marginTop: -1,
  },
  note: {
    flex: 1,
    fontSize: 13,
    color: '#67758f',
    marginBottom: theme.spacing(1),
  },
  hour: {
    flex: 1,
    fontSize: 12,
    color: '#67758f',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: -theme.spacing(1),
  },
})


