import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { DateUtils, Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

import pillIcon from 'assets/images/meds/pill.png'

const Entry = props => {
  return (
    <View style={styles.containerEntry}>
      <Image source={pillIcon} style={styles.icon}/>
      <Text text={DateUtils.jsDateToHumanTime(props.entry.timestamp)} allowStyles style={styles.hour}/>
      <Text text={props.entry.med.name} allowStyles style={styles.name}/>
      <Text text={`(${props.entry.amount * props.entry.med.unitAmount}`} allowStyles style={styles.amount}/>
      <Text text={`${props.entry.med.unit})`} allowStyles style={styles.unit}/>
    </View>
  )
}

export const MedsCardTimeline = (props) => {
  return (
    <ContainerTimelineCard>
      <View style={styles.wrapper}>
        {
          props.entries &&
          props.entries.length > 0 &&
          props.entries.map((entry, index) => {
            return (
              <Entry entry={entry} key={index}/>
            )
          })
        }
      </View>
    </ContainerTimelineCard>
  )
}

const styles = StyleSheet.create({
  wrapper: {

  },
  name: {
    marginRight: theme.spacing(1.5),

  },
  amount: {
    marginRight: theme.spacing(0.5),
    color: '#67758f',

  },
  unit: {
    color: '#67758f',

  },
  hour: {
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.2),
    fontSize: 12,
    color: '#67758f',
    textAlign: 'center',
    minWidth: 35,
  },
  containerEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(0.8),
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: theme.spacing(1),

  },

})
