/* eslint no-console: 'off' */
import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Text from 'lib/ui/Text'
import { theme, UIValues } from '_appSetup/Theme'
import { Jiro } from 'react-native-textinput-effects'

// COMBAK make it like Frida's regex text input
//

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: Boolean(this.props.autoFocus),
    }
  }

  componentDidMount() {
    if (this.props.style) {
      warn('<Input/> Sending style as a prop is not allowed - use class styles instead.')
    }
  }

  getStyles() {
    const wrapperStyles = [wrapperStyleSheet.default] // default text style
    const inputStyles = [inputStyleSheet.default] // default text style
    if (this.props.class) {
      if (typeof this.props.class != 'string') {
        throw '<Input/> Wrong type for "class" prop.. Should be a string, but got:\n\n> class={' + JSON.stringify(classes) + '}'
      }
      const classes = this.props.class.split(' ')
      for (const c in classes) {
        const className = classes[c]
        if (!wrapperStyleSheet[className] || !inputStyleSheet[className]) {
          const flatten = StyleSheet.flatten(wrapperStyleSheet)
          let str = 'classes = [\n'
          Object.keys(flatten).forEach(item => str += '\t' + item + ',\n')
          str += ']'
          throw '<Input/> Undefined class \n\n> class={' + JSON.stringify(className) + '}\n\n' + str + '\n\nCheck Input.js for details.'
        }
        wrapperStyles.push(wrapperStyleSheet[className])
        inputStyles.push(inputStyleSheet[className])
      }
    }
    return { wrapperStyles, inputStyles }
  }

  renderLabel(label, isFocused) {
    const focusDecoration = isFocused && { color: theme.colors.base }
    return (
      <View style={otherStyleSheet.labelWrapper}>
        <Text style={[otherStyleSheet.labelText, focusDecoration]} text={label}/>
      </View>
    )
  }

  onChange(text) {
    this.props.onChange(text)
  }

  onFocus() {
    this.setState({ focus: true })
  }

  onBlur() {
    this.setState({ focus: false })
  }

  render() {
    const styles = this.getStyles()
    const InputComponent = this.props.class.includes('animated') ? Jiro : TextInput
    const placeholder = this.props.class.includes('animated') ? null : this.props.placeholder
    const focusDecoration = this.state.focus && { borderBottomColor: theme.colors.midLight }
    const LabelComponent = !this.props.class.includes('animated') && this.props.label && this.renderLabel(this.props.label, this.state.focus)
    return (
      <View style={[styles.wrapperStyles, focusDecoration]}>
        {LabelComponent}
        <InputComponent
          ref={(ref) => { this.textInput = ref }}
          label={this.props.label}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          activeColor={theme.colors.base}
          passiveColor={theme.colors.midLight}
          borderColor={theme.colors.lightest}
          style={styles.inputStyles}
          inputStyle={styles.inputStyles}
          labelStyle={otherStyleSheet.labelStyle}
          onChangeText={(text) => this.onChange(text)}
          value={this.props.value}
          placeholderTextColor={theme.colors.veryLight}
          {...this.props}
          placeholder={placeholder}
        />
      </View>
    )
  }
}

const DEFAULT_MARGIN = 10

// NOTE: Keep all available properties here even if empty
export const wrapperStyleSheet = StyleSheet.create({
  default: { // default, override if necessary
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.veryLight,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  animated: {
    borderBottomWidth: 0,
    borderBottomColor: UIValues.borderColor,
  },
  center: {

  },
  margin: {
    margin: DEFAULT_MARGIN,
  },
  marginTopBottom: {
    marginTop: DEFAULT_MARGIN,
    marginBottom: DEFAULT_MARGIN,
  },
})

// NOTE: Keep all available properties here even if empty
export const inputStyleSheet = StyleSheet.create({
  default: { // default, override if necessary
    // fontFamily: 'Avenir_35_Light',
    fontSize: 18,
    width: '100%',
    fontWeight: '400',
    color: theme.colors.darkest,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // marginLeft: 10,
  },
  animated: {
    marginTop: 0,
    marginBottom: 0,
    // marginLeft: 0,
  },
  center: {
    textAlign: 'center',
  },
  margin: {
  },
  marginTopBottom: {
  },
})

export const otherStyleSheet = StyleSheet.create({
  labelStyle: {
    fontSize: 15,
    color: theme.colors.midLight,
    fontWeight: '100',
  },
  labelWrapper: {
    width: '100%',
  },
  labelText: {
    color: theme.colors.midlight,
  },
})
