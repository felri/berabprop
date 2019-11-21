import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { ContainerTimelineCard } from 'components/timeline/ContainerTimelineCard'

export const FactorsCardTimeline = (props) => {
  function getEntries(factor) {
    let result = []
    for (let i = 0; i < props.entries.length; i++) {
      if (props.entries[i].category === factor.sectionName) result.push(props.entries[i])
    }
    return result
  }

  return (
    <ContainerTimelineCard>
      <View style={styles.wrapper}>
        {
          props.factors &&
          props.factors.length > 0 &&
          props.factors.map((factor, index) => {
            let entries = getEntries(factor)
            return (
              entries &&
                entries.length > 0 ?
                <View style={styles.containerEntry} key={index}>
                  <View style={styles.containerIcon}>
                    <Image source={factor.sectionIcon} style={styles.sectionImage} />
                  </View>
                  {
                    entries.map((entry, index) => {
                      const name = entry.name + (index == (entries.length - 1) ? '' : ', ')
                      return (
                        <View style={styles.containerName} key={index}>
                          <Text text={name} />
                        </View>
                      )
                    })
                  }
                </View> : false
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerEntry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  containerName: {
    justifyContent: 'flex-start',
    marginTop: -theme.spacing(0.1)
  },
  containerIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0.7),
  },
  sectionImage: {
    width: 18,
    height: 18,
    marginBottom: theme.spacing(1),
  },
})
