import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

import badIcon from 'assets/images/significantEvents/bad.png'
import neutralIcon from 'assets/images/significantEvents/neutral.png'
import goodIcon from 'assets/images/significantEvents/good.png'

const Entry = props => {
  const entry = props.entry.sentiment === props.sig && props.entry
  return (
    entry ?
      <View style={styles.containerEntry}>
        <View style={styles.containerFirstRow}>
          <View style={styles.containerIcon}>
            <Image source={props.icon} style={styles.icon}/>
          </View>
          <View style={styles.containerTitle}>
            <Text text={entry.description} allowStyles style={[styles.title, { color: props.color }]}/>
          </View>
        </View>
        {entry.note.length > 0 ? (
          <View style={styles.containerText}>
            <Text text={entry.note} allowStyles style={styles.note}/>
          </View>
        ) : null}

      </View>
      : null
  )
}

export const SignificantTimeline = (props) => {
  return (
    <ContainerTimelineCard>
      <View style={styles.wrapper}>
        {
          props.entries &&
          props.entries.length > 0 &&
          props.entries.map((entry, index) => {
            return (
              <React.Fragment key={index}>
                <Entry entry={entry} icon={badIcon} sig={'BAD'} color={theme.colors.sig.pink}/>
                <Entry entry={entry} icon={neutralIcon} sig={'NEUTRAL'} color={theme.colors.sig.grey}/>
                <Entry entry={entry} icon={goodIcon} sig={'GOOD'} color={theme.colors.sig.green}/>
              </React.Fragment>
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
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  containerText: {
    marginLeft: theme.spacing(4.1),

  },
  containerTitle: {
    flexWrap: 'wrap',
    flex: 1,
  },
  waterText: {
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(0.2),

    fontSize: 13,
    color: '#67758f',
  },
  containerFirstRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginBottom: theme.spacing(1),
  },
  containerIcon: {
    padding: theme.spacing(0.7),
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(0.3),
    minWidth: 40,
    fontSize: 14,
    color: '#67758f',

  },
  note: {
    fontSize: 13,
    flexShrink: 1,
    color: '#67758f',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

  },
  icon: {
    width: 18,
    height: 18,
  },
})
