/* eslint no-console: 'off', no-proto: 'off' */
import React, { Component } from 'react'
import { View, StyleSheet, Text as RNText } from 'react-native'
import { UIValues, theme } from '_appSetup/Theme'

RNText.defaultProps = RNText.defaultProps || {}
RNText.defaultProps.allowFontScaling = false


// COMBAK the performance of this could be optimised for re-rendering

const allowStyles = ['Button', 'Input', 'ProgressIndicator', 'HourSlots', 'Avatar', 'DayAvailabilityView', 'List'] // disables styles prop warning for certain components

export default class Text extends Component {
  componentDidMount() {
    if (this.props.style && !this.props.allowStyles) {
      // NOTE Only bypass this check with 'allowStyles' if you **really** need it (ie. buttons and stuff).
      // For actual text, stick to one of the styles.
      const parentComponentName = this._reactInternalFiber._debugOwner.stateNode.__proto__.constructor.displayName
      if (allowStyles.indexOf(parentComponentName) == -1) {
        warn('<Text/> Sending style as a prop should not be used - use class styles instead.', {
          in: parentComponentName, style: this.props.style,
        })
      }
    }
  }

  getStyles() {
    const styles = [styleSheet.default] // default text style
    if (this.props.class) {
      if (typeof this.props.class != 'string') {
        throw '<Text/> Wrong type for "class" prop. Should be a string, but got:\n\n> class={' + JSON.stringify(classes) + '}'
      }
      const classes = this.props.class.split(' ')
      for (const c in classes) {
        const className = classes[c]
        if (!styleSheet[className]) {
          const flatten = StyleSheet.flatten(styleSheet)
          let str = 'classes = [\n'
          Object.keys(flatten).forEach(item => str += '\t' + item + ',\n')
          str += ']'
          throw '<Text/> Undefined class \n\n> class={' + JSON.stringify(className) + '}\n\n' + str + '\n\nCheck Text.js for details.'
        }
        styles.push(styleSheet[className])
      }
    }
    return styles
  }

  render() {
    const styles = this.getStyles()
    return (
      <View>
        <RNText {...this.props} style={[styles, this.props.style]}>{this.props.text}</RNText>
      </View>
    )
  }
}

// NOTE: Keep all available properties here even if empty
export const styleSheet = StyleSheet.create({
  /**
   * Font Classes
   */
  default: { // default, override if necessary
    fontFamily: theme.fonts.main,
    fontSize: 14,
    color: theme.colors.text,
  },
  hugeTitle: {
    fontSize: 60,
    fontWeight: '500',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: theme.colors.darkBlue,
  },
  subTitle: {
    color: theme.colors.darkBlue,
  },
  h1: {
    fontSize: 52,
  },
  h2: {
    fontSize: 36,
  },
  h3: {
    fontSize: 30,
  },
  h4: {
    fontSize: 24,
  },
  h5: {
    fontSize: 22,
  },
  p0: {
    fontSize: 18,
  },
  p1: {
    fontSize: 16,
  },
  p2: {
    fontSize: 13,
  },
  /**
   * Font Colors
   */
  blackGrey: {
    color: theme.colors.black,
  },
  veryDarkGrey: {
    color: theme.colors.darkest,
  },
  midDarkGrey: {
    color: theme.colors.midDark,
  },
  baseGrey: {
    color: theme.colors.grey,
  },
  midLightGrey: {
    color: theme.colors.midLight,
  },
  lightGrey: {
    color: theme.colors.lightGrey,
  },
  veryLightGrey: {
    color: theme.colors.light,
  },
  ultraLightGrey: {
    color: theme.colors.lightest,
  },
  white: {
    color: theme.colors.white,
  },
  /**
   * Font Styles
   */
  flex: {
    ...theme.flex,
  },
  bold: {
    fontWeight: '600',
  },
  center: {
    textAlign: 'center',
  },
  paragraphMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  headerMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  fullWidth: {
    width: '100%',
  },
  listSection: {
    fontSize: 26,
    margin: UIValues.containerMargin,
    marginTop: UIValues.containerMargin + 4,
    marginBottom: 0,
    paddingLeft: UIValues.containerMargin,
    // textAlign: 'center',
    color: '#555',
    fontWeight: '300',
  },
})
