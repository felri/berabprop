import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import posed from 'react-native-pose'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'

import ModalNavigation from 'navigation/overlays/Modal'
import { UIValues, theme } from '_appSetup/Theme'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.dismiss = this.dismiss.bind(this)
    this.state = {
      pose: 'init',
    }
  }

  componentDidMount() {
    this.setState({ pose: 'show' })
  }

  componentDidUpdate(prevProps) {
    const prevModal = prevProps.showModal
    const thisModal = this.props.showModal
    if (prevModal && !thisModal) {
      this.setState({ pose: 'init' })
    }
  }

  dismiss() {
    ModalNavigation.close()
  }

  render() {
    return (
      <TouchableOpacity style={styles.dismissArea} onPress={this.dismiss} activeOpacity={1}>
        <Background style={styles.background} pose={this.state.pose}></Background>
        <TouchableOpacity style={[styles.innerWrapper, this.props.innerWrapperStyle]} onPress={() => null} activeOpacity={1}>
          {this.props.children}
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

ReactMixin(Modal.prototype, TimerMixin)

function MapStateToProps(state) {
  return {
    showModal: state.AppStatus.showModal,
  }
}

export default connect(MapStateToProps, null)(Modal)

const Background = posed.View({
  init: {
    opacity: 0,
    transition: {
      duration: 250,
      ease: 'easeOut',
      useNativeDriver: true,
    },
  },
  show: {
    opacity: 1,
    delay: 50,
    transition: {
      duration: 750,
      ease: 'easeIn',
      useNativeDriver: true,
    },
  },
})

const styles = StyleSheet.create({
  dismissArea: {
    ...theme.flex,
    ...theme.full,
    ...theme.center,
  },
  background: {
    ...theme.absolute,
    ...theme.center,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerWrapper: {
    width: '90%',
    // height: 400,
    maxHeight: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: UIValues.containerBorderRadius,
    padding: UIValues.itemPadding,
  },
})
