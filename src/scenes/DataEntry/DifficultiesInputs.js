import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils } from 'lib'
import { theme } from '_appSetup/Theme'

import { entryDifficulty } from 'actions/Entries'

const Button = (props) => {
  let color
  if (props.text == 0) color = theme.colors.difficulties.darkGreen
  if (props.text == 1) color = theme.colors.difficulties.lightGreen
  if (props.text == 2) color = theme.colors.difficulties.lightPink
  if (props.text == 3) color = theme.colors.difficulties.darkPink
  if (props.text == 4) color = theme.colors.difficulties.red
  return (
    <TouchableOpacity
      onPress={() => entryDifficulty(props.name, props.text, props.passProps.timeOfDay, props.passProps.selectedDay)}
      style={[styles.buttonWrapper, { borderColor: color, backgroundColor: props.selected ? color : null }]}>
      <Text text={props.text} allowStyles style={[styles.buttonText, { color: props.selected ? 'black' : color }]}/>
    </TouchableOpacity>
  )
}

const DifficultiesInputs = (props) => {

  const noneButtonPressed = () => {
    props.activeDifficulties.forEach(({ name }) => {
      if (!props.entries.find(e => e.name == name)) {
        entryDifficulty(name, 0, props.timeOfDay, props.selectedDay)
      }
    })
  }

  return (
    <ScrollView style={styles.wrapper}>
      {props.activeDifficulties.map((d, index) => {
        const difficultyEntry = props.entries.filter(e => e.name == d.name)
        const severity = difficultyEntry.length ? difficultyEntry[0].severity : -1

        let description = { text: 'No entry', color: '#888' }
        if (severity == 0) description = { text: 'None', color: theme.colors.difficulties.darkGreen }
        if (severity == 1) description = { text: 'Mild', color: theme.colors.difficulties.lightGreen }
        if (severity == 2) description = { text: 'Moderate', color: theme.colors.difficulties.lightPink }
        if (severity == 3) description = { text: 'Severe', color: theme.colors.difficulties.darkPink }
        if (severity == 4) description = { text: 'Unbearable', color: theme.colors.difficulties.red }

        return (
          <View key={index} style={styles.difficultyWrapper}>
            <View style={[theme.row, { justifyContent: 'space-between' }]}>
              <Text text={d.name}/>
              <Text text={description.text} allowStyles style={{ color: description.color }}/>
            </View>
            <View style={styles.numberRow}>
              <Button text={0} selected={severity == 0} name={d.name} passProps={props}/>
              <Button text={1} selected={severity == 1} name={d.name} passProps={props}/>
              <Button text={2} selected={severity == 2} name={d.name} passProps={props}/>
              <Button text={3} selected={severity == 3} name={d.name} passProps={props}/>
              <Button text={4} selected={severity == 4} name={d.name} passProps={props}/>
            </View>
          </View>
        )
      })}
      <TouchableOpacity style={styles.noneButtonWrapper} onPress={noneButtonPressed}>
        <Text text={'Mark '}/>
        <Text text={'"None"'} allowStyles style={{ color: theme.colors.difficulties.darkGreen }}/>
        <Text text={' for remaining'}/>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  noneButtonWrapper: {
    ...theme.center,
    ...theme.row,
    margin: theme.spacing(2),
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  difficultyWrapper: {
    padding: theme.spacing(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  numberRow: {
    ...theme.row,
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  buttonWrapper: {
    ...theme.center,
    borderWidth: 2,
    borderRadius: theme.spacing(1),
    width: 38,
    height: 38,
  },
})

function MapStateToProps(state, ownProps) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    activeDifficulties: state.UserConfig.difficulties.items.filter(d => d.shown == true),
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'DIFFICULTY' &&
      e.timeOfDay == ownProps.timeOfDay
    ) : [],
    selectedDay,
  }
}

export default connect(MapStateToProps)(DifficultiesInputs)
