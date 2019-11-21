import React, { useState, useEffect, Fragment } from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
import { Text } from 'lib'
import { connect } from 'react-redux'
import { theme } from '_appSetup/Theme'
import Collapsible from 'react-native-collapsible'

// Images
import ArrowDown from 'assets/images/arrowDown.png'

const HomeEntryCard = (props) => {
  return (
    <View style={styles.wrapper}>

      <TouchableOpacity style={styles.topContentWrapper} onPress={() => props.setOpen(props.open ? null : props.title)}>
        <View style={styles.titleRow}>
          <Text text={props.title} allowStyles class={'title'} style={styles.title}/>
          <View style={styles.iconWrapper}>
            <Image source={props.icon} style={styles.icon}/>
          </View>
        </View>

        {!props.open ? (
          <Text text={props.closedText} allowStyles style={styles.closedText}/>
        ) : null}

      </TouchableOpacity>

      <View>
        <Collapsible collapsed={!props.open}>
          <View style={styles.openComponentWrapper}>
            {props.children}
          </View>
        </Collapsible>

        <TouchableOpacity onPress={() => props.setOpen(props.open ? null : props.title)}>
          <View style={styles.arrowContainer}>
            <Image
              source={ArrowDown}
              style={props.open ? [theme.img, { transform: [{ rotate: '180deg' }] }] : theme.img}
              resizeMode={'center'}/>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  topContentWrapper: {
    padding: theme.spacing(1),
  },
  titleRow: {
    ...theme.row,
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  text: {
    marginTop: theme.spacing(3.12),
    color: theme.colors.darkBlue,
    fontSize: 14,
  },
  iconWrapper: {
    ...theme.center,
    ...theme.circle(40),
    borderWidth: 1,
    borderColor: theme.colors.greyLine,
  },
  icon: {
    width: 20,
    height: 20,
  },
  closedText: {
    margin: theme.spacing(1),
  },
  arrowContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#F7F7FF',
  },
})

export default HomeEntryCard
