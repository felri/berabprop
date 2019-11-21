import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import posed from 'react-native-pose'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'

import { ProgressIndicator } from 'lib'
import { UIValues, theme } from '_appSetup/Theme'

/**
 * @name Pager
 * @description This pager receives items as children and renders them one at a time, animating transitions. Use this to avoid issues with Slides.js ScrollView.
 *
 * @method nextPage() goes to next page
 * @method prevPage() goes to prev page
 */
export default class Pager extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.state = {
      index: 0,
    }
  }

  nextPage() {
    const index = this.state.index + 1
    if (index < this.props.children.length) {
      this.setState({ index })
    }
  }

  prevPage() {
    const index = this.state.index - 1
    if (index >= 0) {
      this.setState({ index })
    }
  }

  render() {
    const props = this.props
    const showIndicator = props.hasOwnProperty('showIndicator') ? props.showIndicator : true
    const children = this.props.children.map((item, index) => <Page currPage={this.state.index} index={index} key={index} child={item}/>)
    return (
      <View style={theme.full}>
        {children}
        {showIndicator && <ProgressIndicator index={this.state.index} length={this.props.children.length}/>}
      </View>
    )
  }
}

/**
 * Page Item Component
 */
class Page extends Component {
  constructor(props) {
    super(props)
    this.updatePose = this.updatePose.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.state = {
      pose: 'show',
      visible: this.props.index == 0,
    }
  }

  componentDidMount() {
    this.updatePose()
  }

  componentDidUpdate(prevProps) {
    if (this.props.currPage != prevProps.currPage) {
      this.updatePose()
    }
  }

  show(pose = 'show') {
    if (pose != this.state.pose) {
      this.setState({ pose, visible: true })
    }
  }

  hide(pose) {
    if (pose != this.state.pose) {
      this.setState({ pose })
      this.setTimeout(() => {
        this.setState({ visible: false })
      }, transition.duration)
    }
  }

  updatePose() {
    if (this.props.currPage == this.props.index) {
      this.show()
    } else {
      if (this.props.currPage > this.props.index) {
        this.hide('past')
      } else {
        this.hide('init')
      }
    }
  }

  render() {
    const visible = this.state.visible
    return (
      <PageWrapper pose={this.state.pose} style={styles.page}>
        { visible && this.props.child }
      </PageWrapper>
    )
  }
}

ReactMixin(Page.prototype, TimerMixin)

/**
 * Styles and animations
 */
const styles = StyleSheet.create({
  page: {
    ...theme.absolute,
    justifyContent: 'center',
    width: UIValues.width,
    height: '100%',
  },
})

const transition = {
  duration: 500,
  ease: 'easeOut',
  useNativeDriver: true,
}

const PageWrapper = posed.View({
  init: {
    left: UIValues.width * 1.2,
    transition: transition,
  },
  show: {
    left: 0,
    transition: transition,
  },
  past: {
    left: -UIValues.width * 1.2,
    transition: transition,
  },
})
