import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { UIValues, theme } from '_appSetup/Theme'

import { ProgressIndicator } from 'lib'

/**
 * Slides Component
 *
 * Send items as children.
 */

class Slides extends Component {
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.state = {
      index: 0,
    }
  }

  keyExtractor(item, index) {
    return (typeof item == 'object' ? item[0] : item) + String(index)
  }

  onScroll(event) {
    const x_pos = event.nativeEvent.contentOffset.x
    const index = x_pos / UIValues.width
    if (index === parseInt(index) && index != this.state.index) {
      this.setState({ index })
    }
  }

  renderPage({ item }) {
    return (
      <View style={[styles.page]}>
        {item}
      </View>
    )
  }

  nextPage() {
    const index = this.state.index + 1
    if (index < this.props.children.length) {
      this.list.scrollToIndex({ index })
    }
  }

  prevPage() {
    const index = this.state.index - 1
    if (index >= 0) {
      this.list.scrollToIndex({ index })
    }
  }

  render() {
    const props = this.props
    const showIndicator = props.hasOwnProperty('showIndicator') ? props.showIndicator : true
    const scrollEnabled = props.hasOwnProperty('scrollEnabled') ? props.scrollEnabled : true
    return (
      <View style={theme.full}>
        <FlatList
          ref={ref => this.list = ref}
          keyExtractor={(item, index) => this.keyExtractor(item, index)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.props.children}
          renderItem={this.renderPage}
          onScroll={this.onScroll}
          scrollEventThrottle={32}
          scrollEnabled={scrollEnabled}
          pagingEnabled={true}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='never'
        />
        {showIndicator && <ProgressIndicator index={this.state.index} length={this.props.children.length}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    width: UIValues.width,
    justifyContent: 'center',
    height: '100%',
  },
})

export default Slides
