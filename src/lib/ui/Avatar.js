/* eslint no-console: 'off', no-proto: 'off' */
import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text, Misc, Tools } from 'lib'
import { theme } from '_appSetup/Theme'

// COMBAK the performance of this could be optimised for re-rendering

const allowStyles = [] // disables styles prop warning for certain components

export default class Avatar extends Component {
  componentDidMount() {
    if (this.props.style) {
      // NOTE Only bypass this check with 'allowStyles' if you **really** need it (ie. buttons and stuff).
      // For actual text, stick to one of the styles.
      const parentComponentName = this._reactInternalFiber._debugOwner.stateNode.__proto__.constructor.displayName
      if (allowStyles.indexOf(parentComponentName) == -1) {
        warn('<Avatar/> Sending style as a prop is not supported on Avatar. Use options provided or edit custom component.')
      }
    }
  }

  getStyles() {
    const imageStyle = [imageStyleSheet.default]
    const textStyle = [textStyleSheet.default]
    if (this.props.class) {
      if (typeof this.props.class != 'string') {
        throw '<Avatar/> Wrong type for "class" prop in <Avatar.../>. Should be a string, but got:\n\n> class={' + JSON.stringify(classes) + '}'
      }
      const classes = this.props.class.split(' ')
      for (const c in classes) {
        const className = classes[c]
        if (!imageStyleSheet[className]) {
          const flatten = StyleSheet.flatten(imageStyleSheet)
          let str = 'classes = [\n'
          Object.keys(flatten).forEach(item => str += '\t' + item + ',\n')
          str += ']'
          throw '<Avatar/> Undefined class in <Avatar.../> \n\n> class={' + JSON.stringify(className) + '}\n\n' + str + '\n\nCheck Avatar.js for details.'
        }
        imageStyle.push(imageStyleSheet[className])
        textStyle.push(textStyleSheet[className])
      }
    }
    return { imageStyle, textStyle }
  }

  getLabelColor(hex) {
    const color = Tools.hexToRgb(hex)
    const brightness = ((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000
    const threshold = 170
    if (brightness > threshold) {
      return '#444'
    } else {
      return 'white'
    }
  }

  getLetterFromName(pos) {
    const name = this.props.profile.first_name
    const start = pos
    const end = start + 1
    if (name) {
      return name.substring(start, end)
    } else {
      return null
    }
  }

  renderImage() {
    const { imageStyle, textStyle } = this.getStyles()
    const profile = this.props.profile
    if (!profile.avatar) {
      const initial = this.getLetterFromName(0)
      const third = this.getLetterFromName(2)
      const color = Misc.matchLetterToColor(third)
      const labelColor = this.getLabelColor(color)
      return (
        <View style={[imageStyle, { backgroundColor: color }]}>
          <Text text={initial} style={[textStyle, { color: labelColor }]}/>
        </View>
      )
    } else {
      const image = { uri: profile.avatar }
      return (
        <Image style={[imageStyleSheet.default, imageStyle]} source={image}/>
      )
    }
  }

  render() {
    const { imageStyle } = this.getStyles()
    const image = this.renderImage()
    const canEdit = this.props.onEdit && this.props.class.includes('large')
    const disabled = !canEdit
    const onPress = this.props.onEdit
    return (
      <TouchableOpacity style={[styles.wrapper, imageStyle]} disabled={disabled} onPress={onPress} activeOpacity={0.5}>
        {image}
        {canEdit &&
          <View style={styles.editImage}>
            <Text text={'Edit...'} style={styles.editImageText}/>
          </View>
        }
      </TouchableOpacity>
    )
  }
}

// NOTE: Keep all available properties here even if empty
const imageStyleSheet = StyleSheet.create({
  default: {
    backgroundColor: theme.colors.light,
    ...theme.center,
  },
  large: {
    width: theme.spacing(27),
    height: theme.spacing(27),
    borderRadius: theme.spacing(13),
  },
  small: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: theme.spacing(7),
  },
})

// NOTE: Keep all available properties here even if empty
const textStyleSheet = StyleSheet.create({
  default: {
  },
  large: {
    fontSize: 150,
    lineHeight: 160,
  },
  small: {
    fontSize: 70,
    lineHeight: 75,
  },
})

// General styles not related to classes
const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  editImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    bottom: 0,
  },
  editImageText: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.white,
  },
})
