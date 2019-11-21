import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/Ionicons'

import { theme, UIValues } from '_appSetup/Theme'
import { Text } from 'lib'
import splash from 'assets/images/splash.png'

/**
 * AppStatus Component
 *
 * All actions should be performed through the AppStatus functions found in navigation/overlays/AppStatus
 *
 * @prop {string} activity loading, done or splash
 * @prop {boolean} fullscreen determines whether to overlay entire screen (obviously)
 */

class AppStatus extends Component {
  renderCenterIndicator(children) {
    return (
      <View style={[theme.center, styles.innerWrapper]}>
        {children}
      </View>
    )
  }

  renderSplash() {
    return (
      <View style={[styles.splashWrapper, theme.center]}>
        <Image source={splash} style={styles.splash} resizeMode={'center'}/>
        <ActivityIndicator size='large' color='#555' style={styles.splashIndicator}/>
        {/* <Text text='ProjectTemplate' class={'h3 fullWidth headerMargin center'}/>
        <Text text='By Victor Rothberg Gimael' class={'lightGrey fullWidth'}/> */}
      </View>
    )
  }

  renderIndicator() {
    const activity = this.props.activity
    if (activity == 'loading') {
      return this.renderCenterIndicator(<ActivityIndicator size='large' color='#444' style={styles.activityIndicator}/>)
    } else if (activity == 'done') {
      return this.renderCenterIndicator(<Icon name='md-checkmark' size={40} color={'#444'}/>)
    } else if (activity == 'splash') {
      return this.renderSplash()
    }
  }

  render() {
    const indicator = this.renderIndicator()
    const fullscreen = (this.props.activity == 'splash' || this.props.fullscreen) && styles.fullscreen
    return indicator ? (
      <View style={[theme.full, styles.wrapper, fullscreen]}>
        {indicator}
      </View>
    ) : (
      null
    )
  }
}

function reduxProps(state) {
  return {
    activity: state.AppStatus.activity,
    fullscreen: state.AppStatus.fullscreen,
  }
}

export default connect(reduxProps, null)(AppStatus)

const styles = StyleSheet.create({
  wrapper: {
    ...theme.center,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  fullscreen: {
    backgroundColor: theme.colors.white,
  },
  innerWrapper: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: UIValues.containerBorderRadius,
    backgroundColor: theme.colors.white,
  },
  splash: {
    // width: 140,
    // height: 140,
  },
  activityIndicator: {
    marginLeft: theme.spacing(1),
  },
  splashWrapper: {
    // flex: 1,
    // width: '100%',
    backgroundColor: theme.colors.white,
  },
  splashIndicator: {
    position: 'absolute',
    paddingTop: theme.spacing(12),
  },
})
