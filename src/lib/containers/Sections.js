import React, { Component } from 'react'
import { View, StyleSheet, SectionList } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'

import { Text } from 'lib'
import { theme } from '_appSetup/Theme'

class Sections extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.renderEmpty = this.renderEmpty.bind(this)
    this.state = {
      refreshing: false,
    }
  }

  // COMBAK write something to detect changes in list and stop refresher

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

  render() {
    const separatorProp = this.props.separators
    const isEmpty = !this.props.data || !this.props.data.length
    const separator = !isEmpty && (separatorProp == undefined || separatorProp == true) && this.renderSeparator
    const headerComponent = this.props.hasOwnProperty('headerComponent') ? this.props.headerComponent : separator
    const footerComponent = this.props.hasOwnProperty('footerComponent') ? this.props.footerComponent : separator
    const extraData = this.props.data && JSON.parse(JSON.stringify(this.props.data))
    return (
      <SectionList
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        ItemSeparatorComponent={separator}
        SectionsHeaderComponent={headerComponent}
        SectionsFooterComponent={footerComponent}
        SectionsEmptyComponent={this.renderEmpty}
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
    height: 160,
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
})

ReactMixin(Sections.prototype, TimerMixin)

export default Sections
