import React, { useState } from 'react'
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils } from 'lib'
import { theme } from '_appSetup/Theme'

import { entryFood } from 'actions/Entries'
import { FoodAddFavourite } from 'actions/Food'

import star from 'assets/images/food/star.png'

const FoodButton = (props) => {
  const pressed = () => {
    const newFood = props.parentProps.entries[0] ? props.parentProps.entries[0].text + `, ${props.item.name}` : `${props.item.name}`
    entryFood(newFood, props.parentProps.time, props.parentProps.selectedDay)
  }
  return (
    <TouchableOpacity
      style={styles.foodButtonWrapper}
      onPress={pressed}>
      <Text text={props.item.name}/>
    </TouchableOpacity>
  )
}

const Separator = () => <View style={{ height: theme.spacing(1) }}/>

const AddButton = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => FoodAddFavourite(props.text, props.timeOfDay)} style={styles.addButtonWrapper}>
        <Image source={star} style={styles.addButtonStar}/>
        <Text style={{ color: 'white' }} allowStyles text={'Add to Favourites'}/>
      </TouchableOpacity>
      {!props.active && <View style={[theme.absolute, { backgroundColor: 'white', opacity: 0.8 }]}/>}
    </View>
  )
}

const FoodInputs = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={props.entries[0] ? props.entries[0].text : ''}
          onChangeText={text => entryFood(text, props.time, props.selectedDay)}
          class={'default'}
          multiline
          style={styles.input}
          placeholder={'Type your meals here...'}
        />
      </View>

      <AddButton
        active={props.entries[0] && !props.favouriteFoods.find(f => f.name == props.entries[0].text)}
        text={props.entries[0] ? props.entries[0].text : null}
        timeOfDay={props.time}
      />

      <View style={styles.favourites}>
        <Text text={`Favourites (${props.time})`} allowStyles style={styles.favouritesLabel}/>
        <FlatList
          data={props.favouriteFoods}
          renderItem={({ item }) => <FoodButton item={item} parentProps={props}/>}
          ListHeaderComponent={Separator}
          ListFooterComponent={Separator}
          ItemSeparatorComponent={Separator}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inputWrapper: {
    height: 100,
    backgroundColor: 'white',
  },
  input: {
    color: theme.colors.text,
    fontFamily: theme.fonts.main,
    paddingHorizontal: theme.spacing(1),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  favourites: {
    padding: theme.spacing(1),
    alignItems: 'stretch',
  },
  favouritesLabel: {
    alignSelf: 'center',
    margin: theme.spacing(1),
  },
  foodButtonWrapper: {
    ...theme.center,
    padding: theme.spacing(1),
    backgroundColor: 'white',
    borderRadius: theme.spacing(1),
    borderWidth: 1,
    borderColor: '#B7C0D3',
  },
  addButtonWrapper: {
    ...theme.row,
    ...theme.center,
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.colors.highlighting,
  },
  addButtonStar: {
    height: 26,
    width: 26,
    marginRight: theme.spacing(1),
  },
})

function MapStateToProps(state, ownProps) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    token: state.Session.token,
    favouriteFoods: state.UserConfig.food.filter(f => f.timeOfDay == ownProps.time),
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'FOOD' && e.timeOfDay == ownProps.time) : [],
    selectedDay,
  }
}

export default connect(MapStateToProps)(FoodInputs)
