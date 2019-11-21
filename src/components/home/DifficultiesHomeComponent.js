import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils, HomeEntryCard } from 'lib'
import { theme } from '_appSetup/Theme'

import DifficultiesSingle from './DifficultiesSingle'

//images
import pacmanCard from 'assets/images/cards/pacmanCard.png'
import monster0 from 'assets/images/difficulties/monster-0.png'
import monster1 from 'assets/images/difficulties/monster-1.png'
import monster2 from 'assets/images/difficulties/monster-2.png'
import monster3 from 'assets/images/difficulties/monster-3.png'
import monster4 from 'assets/images/difficulties/monster-4.png'

const DifficultiesHomeComponent = (props) => {
  let textArr = []
  let maxSevGlobal = -1
  props.activeDifficulties.forEach(d => {
    const relevantEntries = props.entries.filter(e => e.name == d.name)
    let maxSev = -1
    relevantEntries.forEach(e => {
      maxSev = Math.max(e.severity, maxSev)
    })

    const verbArr = ['None', 'Mild', 'Moderate', 'Severe', 'Unbearable']
    if (maxSev > 0) textArr.push(`${verbArr[maxSev]} ${d.name}`)
    maxSevGlobal = Math.max(maxSev, maxSevGlobal)
  })

  const text = textArr.length > 0 ? textArr.join(', ') : 'Enter any difficulty levels'

  let icon = pacmanCard
  if (maxSevGlobal == 0) icon = monster0
  if (maxSevGlobal == 1) icon = monster1
  if (maxSevGlobal == 2) icon = monster2
  if (maxSevGlobal == 3) icon = monster3
  if (maxSevGlobal == 4) icon = monster4

  return (
    <HomeEntryCard
      title={'Difficulties'}
      closedText={text}
      icon={icon}
      open={props.open}
      setOpen={props.setOpen}
    >

      <View style={[theme.row, { paddingHorizontal: theme.spacing(1) }]}>
        <View style={{ flex: 2 }}/>
        <View style={{ flex: 3 }}>
          <View style={[theme.row, { justifyContent: 'space-around' }]}>
            <Text text={'am'}/>
            <Text text={'mid'}/>
            <Text text={'pm'}/>
            <Text text={'late'}/>
          </View>
        </View>
      </View>

      {props.activeDifficulties.map((d, index) => <DifficultiesSingle key={index} name={d.name}/>)}

    </HomeEntryCard>
  )
}

const styles = StyleSheet.create({
})

function MapStateToProps(state) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    activeDifficulties: state.UserConfig.difficulties.items.filter(d => d.shown == true),
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'DIFFICULTY') : [],
    selectedDay,
  }
}

export default connect(MapStateToProps)(DifficultiesHomeComponent)
