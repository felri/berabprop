import React from 'react'
import { StyleSheet, View } from 'react-native'

export const MoodBar = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.bar, { height: `${props.mood}%`, width: '100%', backgroundColor: props.color }]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '78%',
    marginTop: 10,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F4F4F8',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
  },
})
