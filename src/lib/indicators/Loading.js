import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { theme } from '_appSetup/Theme'

export const Loading = (props) => {
  return (
    <View style={theme.loadingWrapper}>
      <ActivityIndicator size='large' color='theme.colors.topBar.light' />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
  },
})

