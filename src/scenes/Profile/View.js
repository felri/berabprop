import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Text, Avatar, Scroll } from 'lib'
import Stack from 'navigation/stack/StackNavigator'

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static get options() {
    return Stack.getTitleObj('ProfileView')
  }

  render() {
    const profile = this.props.profile
    const full_name = profile.first_name + ' ' + profile.last_name
    return (
      <Scroll contentContainerStyle={styles.contentContainer}>
        <View style={styles.innerWrapper}>
          <Avatar profile={profile} class={'large'}/>
          <View style={styles.margin}>
            <Text class={'h3'} text={full_name}/>
          </View>
          <Text class={'p1 paragraphMargin'} text={profile.email}/>
          <Text class={'p1 paragraphMargin'} text={'Other details here'}/>
          <Text class={'p2 lightGrey paragraphMargin'} text={'Some boring disclaimer'}/>
        </View>
      </Scroll>
    )
  }
}

function MapStateToProps(state) {
  const id = state.Session.profileId
  const profiles = state.Profiles
  const profile = profiles[id]
  return {
    profile,
  }
}

export default connect(MapStateToProps, null)(ProfileView)

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  margin: {
    margin: 14,
  },
  text: {
    fontSize: 20,
  },
})
