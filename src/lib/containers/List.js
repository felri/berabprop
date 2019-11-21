import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'
import equals from 'deep-equal'

import { Text } from 'lib'
import { UIValues, theme } from '_appSetup/Theme'

class List extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.renderEmpty = this.renderEmpty.bind(this)
    this.state = {
      refreshing: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.refreshing && this.props.extraData) {
      if (!equals(this.props.extraData, prevProps.extraData)) {
        this.setState({ refreshing: false })
      }
    }
  }

  keyExtractor(item, index) {
    if (typeof item == 'object') {
      return item[0] + String(index)
    } else {
      return item + String(index)
    }
  }

  onRefresh() {
    this.setState({ refreshing: true })
    this.props.onRefresh()
    this.setTimeout(() => {
      this.setState({ refreshing: false })
    }, 6000)
  }

  renderEmpty() {
    const itemsName = this.props.hasOwnProperty('emptyText') ? this.props.emptyText : 'items'
    const text = 'Your ' + itemsName + ' will appear here'
    const smiley = ':)'
    return (
      <View style={styles.emptyWrapper}>
        <Text text={text} style={styles.emptyText} allowStyles/>
        <Text text={smiley} style={styles.smileyText} allowStyles/>
      </View>
    )
  }

  renderSeparator() {
    return (
      <View style={styles.separator}></View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footer}></View>
    )
  }

  render() {
    const separatorProp = this.props.separators
    const isEmpty = !this.props.data || !this.props.data.length
    const separator = !isEmpty && (separatorProp == undefined || separatorProp == true) && this.renderSeparator
    const footer = this.renderFooter
    const headerComponent = this.props.hasOwnProperty('headerComponent') ? this.props.headerComponent : separator
    const footerComponent = this.props.hasOwnProperty('footerComponent') ? this.props.footerComponent : footer
    const extraData = this.props.data && JSON.parse(JSON.stringify(this.props.data))
    return (
      <FlatList
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        ItemSeparatorComponent={separator}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        ListEmptyComponent={this.renderEmpty}
        extraData={extraData}
        {...this.props}
        onRefresh={this.props.onRefresh && this.onRefresh}
        refreshing={this.state.refreshing}
      />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.light,
  },
  emptyWrapper: {
    ...theme.center,
    height: theme.spacing(20),
  },
  emptyText: {
    fontSize: 15,
    color: '#cfcfcf',
  },
  smileyText: {
    margin: theme.spacing(1),
    fontSize: 28,
    fontWeight: '300',
    color: '#cfcfcf',
  },
  footer: {
    height: UIValues.containerMargin,
  },
})

ReactMixin(List.prototype, TimerMixin)

export default List
