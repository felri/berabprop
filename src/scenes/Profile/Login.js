import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { UIValues } from '_appSetup/Theme'

import { Text, Button, Input } from 'lib'
import Stack from 'navigation/stack/StackNavigator'
import Tabs from 'navigation/tab/TabNavigator'
import Profile from 'actions/Profile'


class Login extends Component {
  constructor(props) {
    super(props)
    this.tryLogin = this.tryLogin.bind(this)
    this.state = {
      username: '',
      password: '',
    }
  }

  static get options() {
    return Stack.getTitleObj('Login')
  }

  tryLogin() {
    Profile.tryLogin(this.state)
  }

  trySignup() {
    Tabs.setSignupComponent()
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={styles.wrapper}
        contentContainerStyle={styles.wrapper}
        keyboardVerticalOffset={UIValues.keyboardVerticalOffset}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.margin}>
            <Text class={'h2 lightGrey'} text={'<Login/>'}/>
          </View>
          <View style={styles.margin}>
            <Text class={'h3'} text={'Welcome!'}/>
          </View>
          <View style={styles.margin}>
            <Text class={'p0 center'} text={'Are you ready to join?'}/>
          </View>
          <View style={styles.inputWrapper}>
            <Input
              class={'default marginTopBottom'}
              label={'Email Address'}
              textContentType={'username'}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChange={text => this.setState({ username: text })}
              value={this.state.username}
              keyboardType={'email-address'}
            />
            <Input
              class={'default marginTopBottom'}
              label={'Password'}
              textContentType={'password'}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChange={text => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.loginButtonWrapper}>
            <Button text={'Login'} onPress={this.tryLogin}/>
          </View>
          <Button class={'plain'} text={'Signup'} onPress={this.trySignup}/>
          <Text class={'p2 lightGrey paragraphMargin'} text={'Some boring disclaimer'}/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrapper: {
    alignItems: 'center',
    width: '80%',
  },
  margin: {
    margin: 14,
  },
  text: {
    fontSize: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  loginButtonWrapper: {
    marginBottom: 10,
  },
})
