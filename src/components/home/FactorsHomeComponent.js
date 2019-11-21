import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Text, Chip, DateUtils, HomeEntryCard } from 'lib'
import { theme } from '_appSetup/Theme'

//images
import factorCard from 'assets/images/cards/factorCard.png'
import factorCardSelected from 'assets/images/cards/factorCardSelected.png'

import Accordion from 'react-native-collapsible/Accordion'

import { entryFactor } from 'actions/Entries'

const RenderHeader = (props) => {
  const count = props.entries.filter(e => e.category == props.section.sectionName).length
  return (
    <View style={[theme.row, styles.headerWrapper]}>
      <View style={theme.row}>
        <Image source={props.section.sectionIcon} style={styles.sectionImage}/>
        <Text text={props.section.sectionName} style={styles.sectionText}/>
      </View>

      {count > 0 && (
        <View style={styles.factorCountWrapper}>
          <Text text={count} allowStyles style={{ color: 'white' }}/>
        </View>
      )}

    </View>
  )
}

const RenderContent = (props) => {
  const { sectionFactors } = props.section

  const onPress = (text) => {
    entryFactor(props.section.sectionName, text, props.selectedDay)
  }

  let selectedArr = []
  props.entries.filter(e => e.category == props.section.sectionName).forEach(e => {
    selectedArr.push(e.name)
  })

  return (
    <View style={styles.factorList}>
      {sectionFactors.filter(f => f.shown).map((f, index) => (
        <Chip
          key={index}
          text={f.name}
          color={theme.colors.highlighting}
          onPress={(text) => onPress(text)}
          pressed={selectedArr.includes(f.name)}
        />
      ))}
    </View>
  )
}

const FactorsHomeComponent = (props) => {
  const [activeSections, setActiveSections] = useState([])
  const text = props.entries.length > 0 ? props.entries.map(e => e.name).join(', ') : "What's been happening?"

  return (
    <HomeEntryCard
      title={'Factors'}
      closedText={text}
      icon={props.entries.length > 0 ? factorCardSelected : factorCard}
      open={props.open}
      setOpen={props.setOpen}
    >
      <Accordion
        activeSections={activeSections}
        sections={props.factors.items}
        renderHeader={(section) => <RenderHeader section={section} entries={props.entries}/>}
        renderContent={(section) => <RenderContent section={section} selectedDay={props.selectedDay} entries={props.entries}/>}
        onChange={(active) => setActiveSections(active)}
        touchableComponent={TouchableOpacity}
      />
    </HomeEntryCard>
  )
}

const styles = StyleSheet.create({
  sectionImage: {
    width: 18,
    height: 18,
    margin: theme.spacing(2),
  },
  headerWrapper: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  factorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  factorCountWrapper: {
    ...theme.circle(30),
    ...theme.center,
    marginRight: theme.spacing(1),
    backgroundColor: theme.colors.highlighting,
  },
})

function MapStateToProps(state) {
  const selectedDay = Date.parse(state.HomeScene.selectedDay)
  const date = DateUtils.timestampToYYYYMMDD(selectedDay)
  return {
    token: state.Session.token,
    factors: state.UserConfig.factor,
    entries: state.Entries[date] ? state.Entries[date].filter(e => e.type == 'FACTOR') : [],
    selectedDay,
  }
}

export default connect(MapStateToProps)(FactorsHomeComponent)
