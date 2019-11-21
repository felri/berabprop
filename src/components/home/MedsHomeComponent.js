import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils, HomeEntryCard } from 'lib'
import { theme } from '_appSetup/Theme'

import MedsInput from './MedsInput'

//images
import pillCard from 'assets/images/cards/pillCard.png'
import pillCardSelected from 'assets/images/cards/pillCardSelected.png'

const MedsHomeComponent = (props) => {
  let textArr = []
  let totals = {}
  props.entries.forEach(e => {
    const { name, unit } = e.med
    if (!totals[name]) totals[name] = { amount: 0, unit }
    totals[name].amount = totals[name].amount + (e.amount * e.med.unitAmount)
  })

  for (let name in totals) {
    textArr.push(`${name} ${totals[name].amount} ${totals[name].unit}`)
  }

  const text = textArr.length > 0 ? textArr.join(', ') : 'Have you taken anything today?'

  return (
    <HomeEntryCard
      title={'Meds/Supplements'}
      closedText={text}
      icon={textArr.length > 0 ? pillCardSelected : pillCard}
      open={props.open}
      setOpen={props.setOpen}
    >
      <View>
        {props.meds.map((m, index) => <MedsInput med={m} key={index}/>)}
      </View>
    </HomeEntryCard>
  )
}

const styles = StyleSheet.create({
})

function MapStateToProps(state) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'MEDICATION') : [],
    meds: state.UserConfig.meds,
    selectedDay,
  }
}

export default connect(MapStateToProps)(MedsHomeComponent)
