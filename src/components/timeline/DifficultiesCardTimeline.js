import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

import monster0 from 'assets/images/difficulties/monster-0.png'
import monster1 from 'assets/images/difficulties/monster-1.png'
import monster2 from 'assets/images/difficulties/monster-2.png'
import monster3 from 'assets/images/difficulties/monster-3.png'
import monster4 from 'assets/images/difficulties/monster-4.png'

const Entry = props => {
  function getAverageOfDay(entries) {
    let maxSev = -1
    entries.forEach(e => {
      maxSev = Math.max(e.severity, maxSev)
    })
    return maxSev
  }

  function returnMonster(entries) {
    let sum = getAverageOfDay(entries).toFixed(0)
    let monster = { description: '', icon: monster0 }
    if (sum == 1) monster = { description: 'Mild', icon: monster1 }
    if (sum == 2) monster = { description: 'Moderate', icon: monster2 }
    if (sum == 3) monster = { description: 'Severe', icon: monster3 }
    if (sum == 4) monster = { description: 'Unbearable', icon: monster4 }
    return monster
  }

  function getColorTimeOfDay(timeOfDay) {
    let color
    if (timeOfDay.severity == 0) color = theme.colors.difficulties.darkGreen
    if (timeOfDay.severity == 1) color = theme.colors.difficulties.lightGreen
    if (timeOfDay.severity == 2) color = theme.colors.difficulties.lightPink
    if (timeOfDay.severity == 3) color = theme.colors.difficulties.darkPink
    if (timeOfDay.severity == 4) color = theme.colors.difficulties.red
    return color
  }

  return (
    props.entries &&
    props.entries.length > 0 &&
    getAverageOfDay(props.entries) != 0 &&
    <View style={styles.containerEntry}>
      <Image source={returnMonster(props.entries).icon} style={styles.monster}/>
      <Text text={returnMonster(props.entries).description + ' ' + props.text} allowStyles style={styles.difficulty}/>
      <Text text='(' allowStyles style={[styles.difficulty, { marginLeft: theme.spacing(0.5) }]}/>
      {
        props.entries.map((entry, index) => {
          let color = getColorTimeOfDay(entry)
          return (
            <React.Fragment key={index}>
              <Text allowStyles
                text={entry.timeOfDay}
                style={[styles.timeOfDay, { color: color }]}/>
              {
                (props.entries.length - 1 > index) &&
                <Text allowStyles
                  text={'/'}
                  style={styles.difficulty}/>
              }
            </React.Fragment>
          )
        }
        )
      }
      <Text text=')' allowStyles style={[styles.difficulty, { marginRight: theme.spacing(1) }]}/>
    </View>
  )
}

export const DifficultiesCardTimeline = (props) => {
  const entriesByName = {}
  props.difficultyEntries.forEach(e => {
    if (!entriesByName[e.name]) entriesByName[e.name] = []
    entriesByName[e.name].push(e)
  })
  return (
    <ContainerTimelineCard>
      <View style={styles.wrapper}>
        {Object.keys(entriesByName).map((key, index) => (
          <Entry key={index} entries={entriesByName[key]} text={key}/>
        ))}
        {
          props.difficultyNote &&
          props.difficultyNote.length > 0 &&
          <View style={styles.containerEntry}>
            <Text text={props.difficultyNote[0].severity} allowStyles style={styles.note}/>
          </View>
        }
      </View>
    </ContainerTimelineCard>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  timeOfDay: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
  },
  difficulty: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1f345a',
  },
  note: {
    flex: 1,
    fontSize: 13,
    color: '#67758f',
    marginLeft: theme.spacing(3),
  },
  monster: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
  },

})
