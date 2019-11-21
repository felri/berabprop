import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils, HomeEntryCard } from 'lib'
import Settings from '_appSetup/Settings'
import { theme } from '_appSetup/Theme'

import Stack from 'navigation/stack/StackNavigator'

import { entryWater } from 'actions/Entries'

//images
import amLight from 'assets/images/food/am-light.png'
import midLight from 'assets/images/food/mid-light.png'
import pmLight from 'assets/images/food/pm-light.png'
import amWhite from 'assets/images/food/am-white.png'
import midWhite from 'assets/images/food/mid-white.png'
import pmWhite from 'assets/images/food/pm-white.png'
import minus from 'assets/images/food/minus.png'
import plus from 'assets/images/food/plus.png'
import glass from 'assets/images/food/glass.png'

import hamburgerCard from 'assets/images/cards/hamburgerCard.png'
import hamburgerCardSelected from 'assets/images/cards/hamburgerCardSelected.png'

const setWater = (amount, selectedDay) => {
  if (amount >= 0) entryWater(amount, Date.parse(selectedDay))
}

const IconButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.iconButtonWrapper, props.selected && styles.iconButtonWrapperSelected, props.wrapperStyle]}
      onPress={props.onPress}>
      <Image source={props.selected ? props.icon.selected : props.icon.notSelected} style={[styles.iconButtonImage, props.imageStyle]}/>
    </TouchableOpacity>
  )
}

const FoodHomeComponent = (props) => {

  function goScreen(name, passProps) {
    const context = { props: { componentId: 'Home.Home' } }
    const title = `${new Date().setHours(0, 0, 0, 0) == props.selectedDay.setHours(0, 0, 0, 0) ?
      'Today' :
      Settings.DAYS_WEEK_NAME_ARRAY[props.selectedDay.getDay()]}, ${props.selectedDay.getDate()} ${Settings.MONTHS[props.selectedDay.getMonth()]}`
    Stack.pushDataEntryScreen(context, name, title, { passProps })
  }

  // construct text string
  let textArr = []
  if (props.water > 0) textArr.push(`${props.water * 0.25}L Water`)
  let timeOfDayArr = []
  if (props.entries.find(e => e.timeOfDay == 'am')) timeOfDayArr.push('AM')
  if (props.entries.find(e => e.timeOfDay == 'mid')) timeOfDayArr.push('MID')
  if (props.entries.find(e => e.timeOfDay == 'pm')) timeOfDayArr.push('PM')
  if (timeOfDayArr.length > 0) textArr.push(`Food diary for ${timeOfDayArr.join(', ')}`)
  const text = textArr.length > 0 ? textArr.join(', ') : 'What has your diet looked like today?'

  return (

    <HomeEntryCard
      title={'Food diary'}
      closedText={text}
      icon={textArr.length > 0 ? hamburgerCardSelected : hamburgerCard}
      open={props.open}
      setOpen={props.setOpen}
    >

      <View>
        <View style={styles.daySectionWrapper}>
          <View style={styles.dayColumn}>
            <Text text='am'/>
            <IconButton
              selected={props.entries.find(e => e.timeOfDay == 'am')}
              icon={{ notSelected: amLight, selected: amWhite }}
              onPress={() => goScreen('DataEntry.Food', 'am')}/>
          </View>
          <View style={styles.dayColumn}>
            <Text text='mid'/>
            <IconButton
              selected={props.entries.find(e => e.timeOfDay == 'mid')}
              icon={{ notSelected: midLight, selected: midWhite }}
              onPress={() => goScreen('DataEntry.Food', 'mid')}/>
          </View>
          <View style={styles.dayColumn}>
            <Text text='pm'/>
            <IconButton
              selected={props.entries.find(e => e.timeOfDay == 'pm')}
              icon={{ notSelected: pmLight, selected: pmWhite }}
              onPress={() => goScreen('DataEntry.Food', 'pm')}/>
          </View>
        </View>
        <View style={styles.waterSectionWrapper}>
          <View style={[theme.row, { justifyContent: 'space-between' }]}>
            <View style={theme.row}>
              <Text text={'Water '}/><Text text={'(250ml cups)'}/>
            </View>
            <Text text={`${props.water * 0.25}l`}/>
          </View>
          <View style={styles.waterSection}>
            <IconButton icon={{ selected: minus, notSelected: minus }} imageStyle={{ width: 16, height: 16 }} onPress={() => setWater(props.water - 1, props.selectedDay)}/>
            <ImageBackground source={glass} style={styles.glass}>
              <Text text={props.water}/>
            </ImageBackground>
            <IconButton icon={{ selected: plus, notSelected: plus }} imageStyle={{ width: 16, height: 16 }} onPress={() => setWater(props.water + 1, props.selectedDay)}/>
          </View>
        </View>
      </View>

    </HomeEntryCard>
  )
}

const styles = StyleSheet.create({
  daySectionWrapper: {
    ...theme.row,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
    paddingBottom: theme.spacing(1),
  },
  iconButtonWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.buttonBorder,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.background,
  },
  iconButtonWrapperSelected: {
    borderColor: theme.colors.highlighting,
    backgroundColor: theme.colors.highlighting,
  },
  iconButtonImage: {
    width: 24,
    height: 24,
  },
  dayColumn: {
    alignItems: 'center',
  },
  waterSectionWrapper: {
    padding: theme.spacing(2),
  },
  waterSection: {
    ...theme.row,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  glass: {
    ...theme.center,
    width: 46,
    height: 46,
  },
})

function MapStateToProps(state) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  return {
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'FOOD') : [],
    water: state.Entries[date] && state.Entries[date].find(e => e.type == 'WATER') ? state.Entries[date].find(e => e.type == 'WATER').amount : 0,
    selectedDay,
  }
}

export default connect(MapStateToProps)(FoodHomeComponent)
