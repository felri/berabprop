import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

import amWhite from 'assets/images/food/am-white.png'
import midWhite from 'assets/images/food/mid-white.png'
import pmWhite from 'assets/images/food/pm-white.png'
import glass from 'assets/images/food/glass-full.png'

const Entry = props => {
  const text = props.entry.timeOfDay === props.timeOfDay && props.entry.text
  const amount = props.entry.type === 'WATER' && props.entry.amount
  return (
    text ?
      <View style={styles.containerEntry}>
        <View style={styles.containerIcon}>
          <Image source={props.icon} style={styles.icon}/>
        </View>
        <Text text={props.timeOfDay} allowStyles style={styles.timeOfDay}/>
        <View style={styles.containerText}>
          <Text text={text} allowStyles style={styles.foodText}/>
        </View>
      </View> :
      amount ?
        <View style={styles.containerEntry}>
          <View style={styles.containerIcon}>
            <Image source={props.icon} style={styles.icon}/>
          </View>
          <Text text={`${amount.toFixed(1) / 4} Litre(s) water`} allowStyles style={styles.waterText}/>
        </View> : false
  )
}

export const FoodCardTimeline = (props) => {
  return (
    <ContainerTimelineCard>
      <View style={styles.wrapper}>
        {
          props.entries &&
          props.entries.length > 0 &&
          props.entries.map((entry, index) => {
            return (
              entry.type === 'FOOD' ?
                <React.Fragment key={index}>
                  <Entry entry={entry} icon={amWhite} timeOfDay={'am'}/>
                  <Entry entry={entry} icon={midWhite} timeOfDay={'mid'}/>
                  <Entry entry={entry} icon={pmWhite} timeOfDay={'pm'}/>
                </React.Fragment>
                : entry.type === 'WATER' && <Entry entry={entry} icon={glass}/>
            )
          })
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
  containerText: {
    flexWrap: 'wrap',
    flex: 1,
  },
  waterText: {
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(0.2),

    fontSize: 13,
    color: '#67758f',
  },
  containerEntry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginBottom: theme.spacing(1),
  },
  containerIcon: {
    backgroundColor: '#6C70F3',
    padding: theme.spacing(0.7),
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeOfDay: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(0.3),
    textAlign: 'center',
    minWidth: 40,
    fontSize: 13,
    color: '#67758f',

  },
  foodText: {
    fontSize: 14,
    flexShrink: 1,
    color: '#67758f',
    marginTop: theme.spacing(0.2),
  },
  icon: {
    width: 14,
    height: 14,
  },
})
