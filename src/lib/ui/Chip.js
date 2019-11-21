import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { View, Text } from 'lib'
import { theme } from '_appSetup/Theme'

const Chip = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        { borderColor: props.color },
        props.pressed && { backgroundColor: props.color },
      ]}
      onPress={() => props.onPress(props.text)}>
      <Text text={props.text} allowStyles style={[
        { color: props.color },
        props.pressed && styles.textSelected,
      ]}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    borderWidth: 1,
    margin: theme.spacing(0.5),
  },
  textSelected: {
    color: 'white',
  },
})

export default Chip
