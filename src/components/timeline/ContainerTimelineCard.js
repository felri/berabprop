import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'

export const ContainerTimelineCard = (props) => {
  return (
    <View style={styles.wrapper}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 40,
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

