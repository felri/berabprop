import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'

//icons
import Icon from 'react-native-vector-icons/dist/AntDesign'

export const TopBarTimeline = (props) => {
  const [date, setDate] = useState()

  useEffect(() => {
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.containerTopBar}>
        <Icon.Button name='search1' backgroundColor='#3F42A7' size={25}/>
        <View style={styles.containerMiddle}>
          <Icon.Button name='arrowleft' backgroundColor='#3F42A7' size={25}/>
          <Text style={styles.title} text={'Sep 2019'} allowStyles/>
          <Icon.Button name='arrowright' backgroundColor='#3F42A7' size={25}/>
        </View>
        <Icon.Button name='upload' backgroundColor='#3F42A7' size={25}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 57,
    backgroundColor: '#3F42A7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'sf-pro-text-heavy',
    fontSize: 20,
  },
  containerMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerTopBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})
