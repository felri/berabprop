import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'lib'
import posed from 'react-native-pose'
import { theme } from '_appSetup/Theme'

/**
 * <ProgressIndicator/>
 *
 * NOTE this component was designed to be used with the  component only.
 *
 * @prop {number} length total number of items
 * @prop {number} index current selected page
 */

const ITEM_SIZE = 26
const SMALL_RATIO = 0.3

export default class ProgressIndicator extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(item) {
    let pose = 'init'
    const index = this.props.index
    if (item == index) {
      pose = 'selected'
    }
    return (
      <AnimatedBubbleWrapper pose={pose}>
        <View style={styles.itemWrapper}>
          <AnimatedOpacity pose={pose}>
            <Text style={styles.indicatorText} text={String(index + 1)}/>
          </AnimatedOpacity>
        </View>
      </AnimatedBubbleWrapper>
    )
  }

  renderItems() {
    const items = []
    for (let i = 0; i < this.props.length; i++) {
      items.push(this.renderItem(i))
    }
    return items
  }

  render() {
    const items = this.renderItems()
    return (
      <View style={styles.wrapper}>
        {items}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    ...theme.absolute,
    top: 'auto',
    height: theme.spacing(10),
    flexDirection: 'row',
    ...theme.center,

  },
  itemWrapper: {
    ...theme.flex,
    ...theme.center,
  },
  indicatorText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
})

const transition = {
  duration: 250,
  ease: 'easeIn',
  useNativeDriver: true, // doesn't work here because it can't native animate backgroundColor
}

const AnimatedBubbleWrapper = posed.View({
  init: {
    scale: SMALL_RATIO,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: ITEM_SIZE/2,
    transition: transition,
  },
  selected: {
    scale: 1,
    transition: transition,
  },
  passive: {
    backgroundColor: [
      'scale', {
        inputRange: [SMALL_RATIO, 1],
        outputRange: [theme.colors.midLight, theme.colors.midDark],
      },
    ],
  },
})

const AnimatedOpacity = posed.View({
  init: {
    opacity: 0,
    transition: transition,
  },
  selected: {
    opacity: 1,
    transition: transition,
  },
})
