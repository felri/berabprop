import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Keyboard, Image, Platform } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'
import ImagePicker from 'react-native-image-crop-picker'

import Settings from '_appSetup/Settings'
import { Text, Button, Pager, Input, Avatar, validateEmail, validatePassword } from 'lib'
import Stack from 'navigation/stack/StackNavigator'
import Tabs from 'navigation/tab/TabNavigator'
import OSAlert from 'navigation/overlays/OSAlert'
import Profile from 'actions/Profile'
import AppStatus from 'navigation/overlays/AppStatus'

import { theme, UIValues } from '_appSetup/Theme'
import logo from 'assets/images/logo.png'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.tryLogin = this.tryLogin.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword1 = this.validatePassword1.bind(this)
    this.validatePassword2 = this.validatePassword2.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openLibrary = this.openLibrary.bind(this)
    this.openPicker = this.openPicker.bind(this)
    this.changeAvatar = this.changeAvatar.bind(this)
    this.done = this.done.bind(this)
    this.state = {
      id: '',
      email: '',
      password_1: '',
      password_2: '',
      first_name: '',
      last_name: '',
      imagePath: null,
    }
  }

  static get options() {
    return Stack.getTitleObj('Signup')
  }

  componentDidMount() {
    Profile.tryAutoLogin()
    this.setTimeout(() => AppStatus.set(null), 1500)
  }

  tryLogin() {
    Tabs.setLoginComponent()
  }

  async validateEmail() {
    const email = this.state.email
    if (validateEmail(email)) {
      const emailAvailable = await Profile.checkAvailability(email)
      if (emailAvailable) {
        Keyboard.dismiss()
        this.pager.nextPage()
      }
    }
  }

  validatePassword1() {
    const password = this.state.password_1
    if (validatePassword(password)) {
      this.pager.nextPage()
    }
  }

  validatePassword2() {
    const password_1 = this.state.password_1
    const password_2 = this.state.password_2
    if (password_1 == password_2) {
      this.pager.nextPage()
    } else {
      OSAlert.error({ body: 'Your passwords do not match!' })
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

  async openCamera() {
    await this.openPicker(ImagePicker.openCamera)
  }

  async openLibrary() {
    await this.openPicker(ImagePicker.openPicker)
  }

  async openPicker(func) {
    try {
      const image = await func(Settings.AVATAR_IMAGE_OPTIONS)
      await this.setState({ imagePath: image.path })
    } catch (err) {
      info(err)
    }
  }

  submit() {
    const state = this.state
    const imagePath = state.imagePath
    const data = {
      email: state.email,
      first_name: state.first_name,
      last_name: state.last_name,
      password: state.password_1,
    }
    const uploadData = Tools.getMultipartImageUploadFormData(data, imagePath)
    Profile.create(uploadData, () => this.pager.nextPage())
  }

  done() {
    const data = {
      username: this.state.email,
      password: this.state.password_1,
    }
    Profile.tryLogin(data)
  }

  render() {
    const state = this.state
    const profile = {
      first_name: state.first_name,
      full_name: state.first_name + ' ' + state.last_name,
      avatar: state.imagePath,
    }
    const changeAvatar = {
      text: profile.avatar ? 'Submit' : 'Select image',
      press: profile.avatar ? this.submit : this.changeAvatar,
      onEdit: profile.avatar && this.changeAvatar,
    }
    return (
      <View style={styles.wrapper}>
        <Pager
          ref={ref => this.pager = ref}
          showIndicator={false}
        >
          <SignupPage
            pageTitle={'Welcome!'}
            pageDescription={'Please enter your email address to start'}
            placeholder={'Email'}
            onChange={(text) => this.setState({ email: text })}
            value={this.state.email}
            onNext={this.validateEmail}
            footerComponent={<Button class={'plain'} text={'Already a user?'} onPress={this.tryLogin}/>}
            headerComponent={<Image source={logo} style={styles.logo}/>}
            keyboardType={'email-address'}
            textContentType={'username'}
          />
          <SignupPage
            pageTitle={'Password'}
            pageDescription={'Please enter your password'}
            placeholder={'Secret password'}
            onChange={(text) => this.setState({ password_1: text })}
            value={this.state.password_1}
            onNext={this.validatePassword1}
            onPrev={() => this.pager.prevPage()}
            secureTextEntry={true}
            textContentType={'password'}
          />
          <SignupPage
            pageTitle={'Repeat password'}
            pageDescription={'Please enter your password once again'}
            placeholder={'Secret password'}
            onChange={(text) => this.setState({ password_2: text })}
            value={this.state.password_2}
            onNext={this.validatePassword2}
            onPrev={() => this.pager.prevPage()}
            secureTextEntry={true}
          />
          <SignupPage
            pageTitle={'First name'}
            pageDescription={'Please enter your first name'}
            placeholder={'First name'}
            onChange={(text) => this.setState({ first_name: text })}
            onPrev={() => this.pager.prevPage()}
            onNext={() => this.pager.nextPage()}
            value={this.state.first_name}
            autoCapitalize={'words'}
          />
          <SignupPage
            pageTitle={'Last name'}
            pageDescription={'Please enter your last name'}
            placeholder={'Last name'}
            onChange={(text) => this.setState({ last_name: text })}
            onPrev={() => this.pager.prevPage()}
            onNext={() => this.pager.nextPage()}
            value={this.state.last_name}
            autoCapitalize={'words'}
          />
          <View style={[theme.center, styles.page]}>
            <View style={[styles.prevWrapper, styles.prevWrapperAvatar]}>
              <Button class={'backRound'} onPress={() => this.pager.prevPage()}/>
            </View>
            <View>
              <View style={[styles.profileWrapper, theme.center]}>
                <Avatar profile={profile} class={'large'} onEdit={changeAvatar.onEdit}/>
                <Text class={'h3 headerMargin'} text={profile.full_name}/>
                <Text text={'Upload your profile image'} class={'p0 lightGrey headerMargin'}/>
              </View>
              <View style={styles.nextWrapper}>
                <Button class={'default'} text={changeAvatar.text} onPress={changeAvatar.press}/>
                <View style={styles.skipAvatarButton}>
                  {!changeAvatar.onEdit && <Button class={'plain'} text={'Later'} onPress={this.submit}/>}
                </View>
              </View>
            </View>
          </View>
          <View style={[theme.center, styles.page]}>
            <View>
              <View style={[theme.center]}>
                <Text text={'Hurray!'} class={'h3 lightGrey headerMargin'}/>
                <Text text={'You are all good to go'} class={'p0 lightGrey headerMargin'}/>
              </View>
              <View style={styles.nextWrapper}>
                <Button class={'default'} text={'Done'} onPress={this.done}/>
              </View>
            </View>
          </View>
        </Pager>
      </View>
    )
  }
}

ReactMixin(Signup.prototype, TimerMixin)

class SignupPage extends Component {
  onNext() {
    Keyboard.dismiss()
    this.setTimeout(() => {
      this.props.onNext()
    }, 200)
  }

  onPrev() {
    Keyboard.dismiss()
    this.setTimeout(() => {
      this.props.onPrev()
    }, 200)
  }

  render() {
    const keyboardType = this.props.keyboardType && this.props.keyboardType
    const textContentType = this.props.hasOwnProperty('textContentType') ? this.props.textContentType : 'none'
    const secureTextEntry = this.props.hasOwnProperty('secureTextEntry') ? this.props.secureTextEntry : false
    const autoCapitalize = this.props.hasOwnProperty('autoCapitalize') ? this.props.autoCapitalize : 'none'
    const nextText = this.props.hasOwnProperty('nextText') ? this.props.nextText : 'Next'
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={styles.page}
        contentContainerStyle={styles.page}
        keyboardVerticalOffset={UIValues.keyboardVerticalOffset}
      >
        <View style={styles.spacer}></View>
        <View style={[theme.center, styles.headerWrapper]}>
          {this.props.headerComponent}
        </View>
        <View style={[theme.center, styles.inputWrapper]}>
          <View style={[theme.center, styles.textWrapper]}>
            <Text text={this.props.pageTitle} class={'h3 veryDarkGrey'}/>
            <Text text={this.props.pageDescription} class={'p1 lightGrey headerMargin'}/>
          </View>
          <Input
            class={'marginTopBottom center'}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            value={this.props.value}
            autoCapitalize={autoCapitalize}
            autocomplete='off'
            autoCorrect={false}
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType='done'
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            textContentType={textContentType}
          />
        </View>
        <View style={[theme.center, styles.footerWrapper]}>
          <View style={styles.nextWrapper}>
            <Button class={'default'} text={nextText} onPress={() => this.onNext()}/>
          </View>
          {this.props.footerComponent}
        </View>
        <View style={styles.spacer}></View>
        {this.props.onPrev && (
          <View style={styles.prevWrapper}>
            <Button class={'backRound'} onPress={() => this.onPrev()}/>
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}

ReactMixin(SignupPage.prototype, TimerMixin)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    flex: 2,
    maxHeight: 100,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 140,
  },
  footerWrapper: {
    flex: 2,
    maxHeight: 100,
  },
  textWrapper: {
    marginBottom: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'space-around',
  },
  logo: {
    height: UIValues.height * 0.15,
    width: UIValues.height * 0.15,
  },
  spacer: {
    flex: 1,
  },
  nextWrapper: {
    margin: 10,
  },
  skipAvatarButton: {
    height: 40,
  },
  prevWrapper: {
    position: 'absolute',
    top: UIValues.marginTop + 20,
    left: 20,
  },
  profileWrapper: {
    margin: 16,
  },
})

export default Signup
