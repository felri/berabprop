import React, { Component } from 'react'
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Text, DateUtils } from 'lib'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theme } from '_appSetup/Theme'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { entrySignificantEvent, removeSignificantEvent } from 'actions/Entries'

import badIcon from 'assets/images/significantEvents/bad.png'
import neutralIcon from 'assets/images/significantEvents/neutral.png'
import goodIcon from 'assets/images/significantEvents/good.png'

const Radio = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.radioWrapper]}>
      <View style={[styles.radioDot, { backgroundColor: props.selected ? props.activeColor : '#ddd' }]}/>
      <Image source={props.icon} style={[styles.radioIcon, { opacity: props.selected ? 1 : 0.3 }]}/>
    </TouchableOpacity>
  )
}

class SignificantEventsInput extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.handleChange = this.handleChange.bind(this)
    this.validates = this.validates.bind(this)
    this.deleteButtonPressed = this.deleteButtonPressed.bind(this)
    let initialState = {
      sentiment: 'NONE',
      description: '',
      date: new Date(),
      note: '',
      isDateTimePickerVisible: false,
    }

    if (this.props.edited) {
      const { sentiment, date, description, note } = this.props.edited
      initialState.sentiment = sentiment
      initialState.date = DateUtils.YYYYMMDDtoTimestamp(date)
      initialState.description = description
      initialState.note = note || ''
    }

    this.state = initialState
  }

  handleChange(input, text) {
    this.setState({ [input]: text })
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  };

  handleDatePicked = date => {
    this.setState({ date })
    this.hideDateTimePicker()
  };

  validates() {
    const { description, sentiment } = this.state
    if (description.length == 0) {
      Alert.alert('No description', 'Please describe your significant event.')
      return false
    }
    if (!['GOOD', 'NEUTRAL', 'BAD'].includes(sentiment)) {
      Alert.alert('No sentiment', 'Please select if the significant event was good, neutral or bad.')
      return false
    }
    return true
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'check') {
      if (this.validates()) {
        const { description, sentiment, note, date } = this.state
        if (this.props.edited) removeSignificantEvent(this.props.edited)
        entrySignificantEvent(description, sentiment, note, date)
        Navigation.pop(this.props.componentId)
      }
    } else {
      Navigation.popTo('Home.Home')
    }
  }

  deleteButtonPressed() {
    Alert.alert(
      `Delete "${this.props.edited.description}"?`,
      `This will irretrievably delete “${this.props.edited.description}” forever. You will lose all stats associated with it, and it will no longer be visisble on the graphs`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            removeSignificantEvent(this.props.edited)
            Navigation.pop(this.props.componentId)
          },
        },
      ],
    )
  }

  render() {
    const { date } = this.state
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dateString = `${date.getDate()} ${monthArr[date.getMonth()]} ${date.getFullYear()}`
    return (
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.inputArea}>
            <View style={{ flex: 2 }}>
              <Text
                text={'Description'}
                allowStyles
                style={styles.inputAreaText}/>
            </View>
            <TextInput
              placeholder={'e.g. "I got the job!"'}
              style={styles.input}
              onChangeText={(text) => this.handleChange('description', text)}
              value={this.state.description}
            />
          </View>
          <View style={[styles.inputArea, { borderTopWidth: 0 }]}>

            <View style={{ flex: 2 }}>
              <Text
                text={'Date of event'}
                allowStyles
                style={styles.inputAreaText}/>

            </View>
            <TouchableOpacity onPress={this.showDateTimePicker} style={styles.input}>
              <Text text={dateString}/>
            </TouchableOpacity>
          </View>

          <Text text={'How would you describe this event?'} allowStyles style={styles.label}/>
          <View style={[styles.inputArea, styles.radioSectionWrapper]}>
            <Radio icon={goodIcon} selected={this.state.sentiment == 'GOOD'} onPress={() => this.handleChange('sentiment', 'GOOD')} activeColor={'#3BB7B0'}/>
            <Radio icon={neutralIcon} selected={this.state.sentiment == 'NEUTRAL'} onPress={() => this.handleChange('sentiment', 'NEUTRAL')} activeColor={'#9CA7BA'}/>
            <Radio icon={badIcon} selected={this.state.sentiment == 'BAD'} onPress={() => this.handleChange('sentiment', 'BAD')} activeColor={'#FF8787'}/>
          </View>

          <TextInput
            multiline
            style={styles.noteInput}
            placeholder={'Add note...'}
            onChangeText={(text) => this.handleChange('note', text)}
            value={this.state.note}
          />

        </View>

        {this.props.edited && (
          <TouchableOpacity style={styles.removeEventButton} onPress={this.deleteButtonPressed}>
            <Text style={styles.removeEventButtonText} text={'Delete event'}/>
          </TouchableOpacity>
        )}

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'date'}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing(2),
    alignItems: 'stretch',
  },
  inputArea: {
    ...theme.row,
    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  inputAreaText: {
    paddingTop: theme.spacing(0.5),
  },
  input: {
    flex: 3,
    padding: 0,
  },
  label: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  radioSectionWrapper: {
    ...theme.row,
    justifyContent: 'space-around',
  },
  radioWrapper: {
    ...theme.row,
    ...theme.center,
  },
  radioDot: {
    ...theme.circle(16),
    backgroundColor: '#ccc',
    marginRight: theme.spacing(2),
  },
  radioIcon: {
    width: 32,
    height: 32,
  },
  noteInput: {
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing(2),
    alignItems: 'flex-start',
    height: 150,
    textAlignVertical: 'top',
  },
  removeEventButton: {
    ...theme.row,
    ...theme.center,
    backgroundColor: '#FF8787',
    height: 50,
    borderRadius: 25,
    margin: theme.spacing(2),
  },
  removeEventButtonText: {
    color: 'white',
  },
})

const MapStateToProps = state => {
  return {
  }
}

export default connect(MapStateToProps)(SignificantEventsInput)

