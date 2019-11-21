import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { theme } from '_appSetup/Theme'

const TabView = (props) => {
  return (
    <ScrollableTabView
      prerenderingSiblingsNumber={10}
      tabBarBackgroundColor={theme.colors.topMenu.dark}
      tabBarActiveTextColor={'white'}
      tabBarInactiveTextColor={'rgba(255,255,255,0.4)'}
      tabBarUnderlineStyle={styles.underlineStyle}
      tabBarTextStyle={styles.textStyle}
      tabStyle={styles.tab}
      {...props}>
      {props.children}
    </ScrollableTabView>
  )
}

const styles = StyleSheet.create({
  underlineStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    fontFamily: theme.fonts.main,
    marginTop: theme.spacing(0.5),
    fontWeight: 'normal',
  },
  tab: {
    backgroundColor: 'red',
    height: 43,
  },
})

export default TabView
