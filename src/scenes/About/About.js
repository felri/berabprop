import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

import Stack from 'navigation/stack/StackNavigator'
import { Text, List } from 'lib'
import { theme, UIValues } from '_appSetup/Theme'

import licenses from '_appSetup/license.json'

const { height, width } = Dimensions.get('window')

export default class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pose: 'init',
    }
  }

  static get options() {
    return Stack.getTitleObj('About')
  }

  renderItem(key, value) {
    log({ key, value })
    const type = 'License type(s): ' + value.licenses
    const repo = 'Online repository: ' + value.repository
    const url = 'License URL: ' + value.licenseUrl
    return (
      <View style={styles.itemWrapper}>
        <Text text={key} class={'p0 veryDarkGrey bold'}/>
        <Text text={type} class={'p2 midDarkGrey paragraphMargin'}/>
        <Text text={repo} class={'p2 midDarkGrey paragraphMargin'}/>
        <Text text={url} class={'p2 midDarkGrey paragraphMargin'}/>
      </View>
    )
  }

  renderHeader() {
    return (
      <View style={[styles.itemWrapper, styles.lastItem]}>
        <Text text={'About this app (Simple PT)'} class={'p0 veryDarkGrey bold'}/>
        <Text text={'This app was created by Victor Rothberg Gimael (victorapps.com | vrgimael@gmail.com) at request from Stefan Joseph.'} class={'p2 midDarkGrey paragraphMargin'}/>
        <Text text={'This page was last updated on March 16th 2019.'} class={'p2 midDarkGrey paragraphMargin'}/>
        <Text text={'Below is a list of the packages used in building this application:'} class={'p2 midDarkGrey paragraphMargin'}/>
      </View>
    )
  }

  render() {
    return (
      <List
        headerComponent={this.renderHeader}
        style={styles.scroll}
        data={Object.keys(licenses)}
        renderItem={({ item }) => this.renderItem(item, licenses[item])}
        contentContainerStyle={styles.containerStyle}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    marginLeft: UIValues.containerMargin,
    marginRight: UIValues.containerMargin,
  },
  itemWrapper: {
    paddingTop: UIValues.containerPadding,
    paddingBottom: UIValues.containerPadding,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.midlight,
  },
  lastItem: {
    borderTopWidth: 0,
  },
})
