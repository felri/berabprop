import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Text, Button, Scroll, List, Avatar } from 'lib'
import Stack from 'navigation/stack/StackNavigator'
// import OSAlert from 'navigation/overlays/OSAlert'
import Profile from 'actions/Profile'

class ProfileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.menuItems = [
      { name: 'Profile Settings', nav: 'Profile.Edit' },
      { name: 'About this app...', nav: 'About.About' },
      { name: 'Logout', run: this.logout },
    ]
  }

  static get options() {
    return Stack.getTitleObj('ProfileMenu')
  }

  onPress(item) {
    if (item.nav) {
      const name = item.nav
      Stack.push(this, { name })
    } else if (item.run) {
      item.run()
    }
  }

  logout() {
    Profile.logout()
  }

  render() {
    const profile = this.props.profile
    if (!profile) return null
    const full_name = profile.first_name + ' ' + profile.last_name
    return (
      <Scroll contentContainerStyle={styles.contentContainer}>
        <View style={styles.innerWrapper}>
          <Avatar profile={profile} class={'large'}/>
          <View style={styles.margin}>
            <Text class={'h3'} text={full_name}/>
          </View>
          <List
            data={this.menuItems}
            renderItem={({ item }) => <Button class={'list'} text={item.name} onPress={() => this.onPress(item)}/>}
          />
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

export default connect(MapStateToProps, null)(ProfileMenu)

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
  profileImageWrapper: {
    backgroundColor: '#ccc',
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
  },
})
