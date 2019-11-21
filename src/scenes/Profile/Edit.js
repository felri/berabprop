import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Text, Avatar, Input, Scroll } from 'lib'
import Stack from 'navigation/stack/StackNavigator'
import Profile from 'actions/Profile'
import OSAlert from 'navigation/overlays/OSAlert'
import ImagePicker from 'react-native-image-crop-picker'
import Settings from '_appSetup/Settings'

class ProfileEdit extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openLibrary = this.openLibrary.bind(this)
    this.openPicker = this.openPicker.bind(this)
    this.changeAvatar = this.changeAvatar.bind(this)
    this.textChange = this.textChange.bind(this)
    this.state = {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      imagePath: null,
      changed: false,
    }
  }

  static get options() {
    return Stack.getTitleObj('Settings')
  }

  componentDidMount() {
    const profile = Object.assign({}, this.props.profile)
    delete profile.avatar
    this.setState({ ...profile })
  }

  componentWillUnmount() {
    if (this.state.changed) {
      this.save()
    }
  }

  onPress(item) {
    if (item.nav) {
      const name = item.nav
      Stack.push(this, { name })
    } else if (item.run) {
      item.run()
    }
  }

  save() {
    const state = this.state
    const imagePath = state.imagePath
    const data = {
      id: state.id,
      email: state.email,
      first_name: state.first_name,
      last_name: state.last_name,
    }
    const uploadData = Tools.getMultipartImageUploadFormData(data, imagePath)
    Profile.save(data.id, uploadData)
  }

  async openCamera() {
    await this.openPicker(ImagePicker.openCamera)
  }

  async openLibrary() {
    await this.openPicker(ImagePicker.openPicker)
  }

  async openPicker(func) {
    try {
      const image = await func(Settings.AVATAR_IMAGE_OPTIONS)
      await this.setState({ imagePath: image.path, changed: true })
    } catch (err) {
      info(err)
    }
  }

  changeAvatar() {
    const onCamera = () => this.openCamera()
    const onLibrary = () => this.openLibrary()
    const onCancel = () => log('Cancel')
    const title = 'Change image'
    const body = 'Do want to take a new picture or select an existing one?'
    const options = [
      { text: 'Cancel', onPress: onCancel, style: 'cancel' },
      { text: 'Camera', onPress: onCamera },
      { text: 'Library', onPress: onLibrary },
    ]
    OSAlert.ask({ title, body, options })
  }

  textChange(key, value) {
    const obj = {}
    obj[key] = value
    this.setState({ ...obj, changed: true })
  }

  render() {
    const profile = this.props.profile
    const full_name = profile.first_name + ' ' + profile.last_name
    if (this.state.imagePath) {
      profile.avatar = this.state.imagePath
    }
    return (
      <Scroll contentContainerStyle={styles.contentContainer}>
        <View style={styles.innerWrapper}>
          <Avatar profile={profile} class={'large'} onEdit={this.changeAvatar}/>
          <View style={styles.margin}>
            <Text class={'h3'} text={full_name}/>
          </View>
          <View style={styles.inputWrapperArea}>
            <InputWrapper
              label={'Email Address'}
              keyboardType={'email-address'}
              value={this.state.email}
              onChange={text => this.textChange('email', text)}
            />
            <InputWrapper
              label={'First name'}
              keyboardType={'default'}
              value={this.state.first_name}
              onChange={text => this.textChange('first_name', text)}
            />
            <InputWrapper
              label={'Last name'}
              keyboardType={'default'}
              value={this.state.last_name}
              onChange={text => this.textChange('last_name', text)}
            />
          </View>
          <Text class={'p2 veryLightGrey'} text={'Changes are saved automatically'}/>
        </View>
      </Scroll>
    )
  }
}

const InputWrapper = (props) => <Input
  class={'default marginTopBottom'}
  autoCapitalize={'none'}
  autoCorrect={false}
  {...props}
/>

function MapStateToProps(state) {
  const id = state.Session.profileId
  const profiles = state.Profiles
  const profile = profiles[id]
  return {
    profile,
  }
}

export default connect(MapStateToProps, null)(ProfileEdit)

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  margin: {
    margin: 14,
  },
  profileImageWrapper: {
    backgroundColor: '#ccc',
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
  },
  inputWrapperArea: {
    width: '100%',
    padding: 16,
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 20,
  },
  editImageButton: {
    height: 30,
    backgroundColor: 'red',
    // marginBottom: 20,
  },
  page: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})
