/* eslint no-console: 'off' */
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Text from 'lib/ui/Text'
import { theme } from '_appSetup/Theme'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

// COMBAK the performance of this could be optimised for re-rendering

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.updateStyles = this.updateStyles.bind(this)
    this.state = {
      outerWrapper: [],
      innerWrapper: [],
      textStyles: [],
      icon: null,
      iconSize: 25,
    }
  }

  componentDidMount() {
    if (this.props.style) {
      warn('<Button/> Sending style as a prop will be deprecated soon - use class styles instead.')
    }
    this.updateStyles()
  }

  componentDidUpdate(prevProps) {
    if (this.props.class != prevProps.class) {
      this.updateStyles()
    }
  }

  updateStyles() {
    const styles = this.getStyles()
    const icon = this.getIcon()
    const outerWrapper = styles.outerWrapper
    const innerWrapper = styles.innerWrapper
    const textStyles = styles.textStyles
    this.setState({ innerWrapper, outerWrapper, textStyles, icon })
  }

  getIcon() {
    if (this.props.class) {
      const classes = this.props.class.split(' ')
      if (classes.indexOf('cancelRound') != -1) {
        return 'remove'
      } else if (classes.indexOf('backRound') != -1) {
        return 'chevron-left'
      } else if (classes.indexOf('plus') != -1) {
        this.setState({ iconSize: 40 })
        return 'plus-circle'
      } else if (classes.indexOf('minus') != -1) {
        this.setState({ iconSize: 40 })
        return 'minus-circle'
      }
    }
  }

  getStyles() {
    const outerWrapper = [outerWrapperStyleSheet.default] // default outer wrapper style
    const innerWrapper = [innerWrapperStyleSheet.default] // default inner wrapper style
    const textStyles = [textStyleSheet.default] // default text style
    if (this.props.class) {
      if (typeof this.props.class != 'string') {
        throw '<Button/> Wrong type for "class" prop in <Button.../>. Should be a string, but got:\n\n> class={' + JSON.stringify(classes) + '}'
      }
      const classes = this.props.class.split(' ')
      for (const c in classes) {
        const className = classes[c]
        if (!innerWrapperStyleSheet[className] || !textStyleSheet[className] || !outerWrapperStyleSheet[className]) {
          const flatten = StyleSheet.flatten(innerWrapperStyleSheet)
          let str = 'classes = [\n'
          Object.keys(flatten).forEach(item => str += '\t' + item + ',\n')
          str += ']'
          throw '<Button/> Undefined class \n\n> class={' + JSON.stringify(className) + '}\n\n' + str + '\n\nCheck Button.js for details.'
        }
        outerWrapper.push(outerWrapperStyleSheet[className])
        innerWrapper.push(innerWrapperStyleSheet[className])
        textStyles.push(textStyleSheet[className])
      }
    }
    return { outerWrapper, innerWrapper, textStyles }
  }

  onPress() {
    log('<Button/>', this.props)
    this.props.onPress()
  }

  renderIcon(icon) {
    return (
      <Icon name={icon} size={this.state.iconSize} color={'#777'}/>
    )
  }

  render() {
    const text = this.props.text
    const icon = this.state.icon
    const disabled = this.props.disabled ? true : (this.props.class && this.props.class.split(' ').indexOf('disabled') != -1)
    return (
      <View style={this.state.outerWrapper}>
        <TouchableOpacity style={this.state.innerWrapper} onPress={() => this.onPress()} activeOpacity={0.7} disabled={disabled}>
          {!icon && text && <Text style={this.state.textStyles} text={text}/>}
          {icon && this.renderIcon(icon)}
        </TouchableOpacity>
      </View>
    )
  }
}

// NOTE: Keep all available properties here even if empty
export const outerWrapperStyleSheet = StyleSheet.create({
  default: { // default, override if necessary
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  empty: {},
  selected: {},
  disabled: {},
  fullWidth: {},
  list: {},
  cancelRound: {
    justifyContent: 'flex-end',
  },
  backRound: {
    justifyContent: 'flex-start',
  },
  plain: {},
  small: {},
  cancel: {},
  save: {},
  disabledPlain: {},
  border: {},
  plus: {},
  minus: {},
  flex: {},
  accept: {},
  mid: {},
})

// NOTE: Keep all available properties here even if empty
export const innerWrapperStyleSheet = StyleSheet.create({
  default: { // default, override if necessary
    // flex: 1,
    backgroundColor: theme.colors.base,
    height: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderRadius: theme.spacing(2),
    ...theme.center,
  },
  empty: {
    backgroundColor: null,
    borderColor: theme.colors.base,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: theme.colors.midDark,
  },
  disabled: {
    backgroundColor: theme.colors.veryLight,
  },
  fullWidth: {
    width: '100%',
  },
  list: {
    width: '100%',
    backgroundColor: null,
    height: 50,
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 0,
    borderRadius: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cancelRound: {
    backgroundColor: theme.colors.light,
    width: theme.spacing(5),
    height: theme.spacing(5),
    paddingLeft: 0,
    paddingRight: 0,
  },
  backRound: {
    backgroundColor: theme.colors.light,
    width: theme.spacing(5),
    height: theme.spacing(5),
    paddingLeft: 0,
    paddingRight: 2,
    paddingTop: 2,
  },
  plain: {
    backgroundColor: 'transparent',
  },
  small: {
    height: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cancel: {
    borderColor: '#C00',
  },
  save: {
    backgroundColor: '#293',
  },
  disabledPlain: {
    backgroundColor: 'transparent',
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.veryLight,
  },
  plus: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
  },
  minus: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
  },
  flex: {
    flex: 1,
  },
  accept: {},
  mid: {
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
})

// NOTE: Keep all available properties here even if empty
export const textStyleSheet = StyleSheet.create({
  default: { // default, override if necessary
    // fontFamily: 'Avenir_35_Light',
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.lightest,
  },
  empty: {
    color: theme.colors.base,
  },
  selected: {},
  disabled: {},
  fullWidth: {},
  list: {
    color: theme.colors.base,
  },
  cancelRound: {},
  backRound: {},
  plain: {
    color: theme.colors.midDark,
  },
  small: {
    fontSize: 14,
    fontWeight: '500',
  },
  cancel: {
    color: '#C00',
  },
  save: {},
  disabledPlain: {
    color: theme.colors.midLight,
  },
  border: {},
  plus: {},
  minus: {},
  flex: {},
  accept: {},
  mid: {
    fontSize: 14,
    fontWeight: '500',
  },
})
