import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { entryMood } from 'actions/Entries'
import { Navigation } from 'react-native-navigation'
import HourPicker from 'components/dataentry/HourPicker'
import Stack from 'navigation/stack/StackNavigator'

// images
import moodOne from 'assets/images/moods/moodOne.png'
import moodTwo from 'assets/images/moods/moodTwo.png'
import moodThree from 'assets/images/moods/moodThree.png'
import moodFour from 'assets/images/moods/moodFour.png'
import moodFive from 'assets/images/moods/moodFive.png'

const moods = [moodFive, moodFour, moodThree, moodTwo, moodOne]

class Mood extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      pose: 'init',
      newFeeling: {},
      feelingsArray: [
        { selected: false, name: 'Happy', on: true },
        { selected: false, name: 'Content', on: true },
        { selected: false, name: 'Grateful', on: true },
        { selected: false, name: 'Confident', on: true },
        { selected: false, name: 'Optimistic', on: true },
        { selected: false, name: 'Joyful', on: true },
        { selected: false, name: 'Loved', on: true },
        { selected: false, name: 'Hopeful', on: true },
        { selected: false, name: 'Super', on: true },
        { selected: false, name: 'Bored', on: true },
        { selected: false, name: 'Frustrated', on: true },
        { selected: false, name: 'Anxious', on: true },
        { selected: false, name: 'Stressed', on: true },
        { selected: false, name: 'Exhausted', on: true },
        { selected: false, name: 'Upset', on: true },
        { selected: false, name: 'Overwhelmed', on: true },
        { selected: false, name: 'Angry', on: true },
        { selected: false, name: 'Lonely', on: true },
        { selected: false, name: 'Adventurous', on: false },
        { selected: false, name: 'Content', on: false },
        { selected: false, name: 'Annoyed', on: false },
        { selected: false, name: 'Delighted', on: false },
        { selected: false, name: 'Fantastic', on: false },
        { selected: false, name: 'Joyful', on: false },
        { selected: false, name: 'Nervous', on: false },
        { selected: false, name: 'Sad', on: false },
        { selected: false, name: 'Tired', on: false },
      ],
      isHourPickerVisible: false,
      moodNumbers: [
        [1, 2, theme.colors.mood.pink],
        [3, 4, theme.colors.mood.orange],
        [5, 6, theme.colors.mood.yellow],
        [7, 8, theme.colors.mood.lightGreen],
        [9, 10, theme.colors.mood.darkGreen],
      ],
      mood: null,
      feelings: [],
      date: null,
      note: null,
      hour: null,
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'check' && this.state.mood && !this.state.timestamp) {
      entryMood(this.state.mood, this.state.feelingsArray, this.state.note, this.state.hour, this.props.selectedDay)
    }
    Navigation.popTo('Home.Home')
  }

  onChangeInputFeeling = (feeling) => {
    this.setState({
      newFeeling: feeling,
    })
  }

  addFeeling = () => {
    const feelingsArray = this.state.feelingsArray
    feelingsArray.push(this.state.newFeeling)
    this.storeFeeling(feelingsArray)
    this.setState({
      addFeeling: false,
      feelingsArray,
      newFeeling: null,
    })
  }

  storeFeeling = async (feelings) => {
    await AsyncStorage.setItem('feelings', JSON.stringify(feelings))
  };

  formatDate = (time) => {
    const date = new Date(time)
    const hour = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return hour
  }

  setAsyncStorageFeelings = async () => {
    const hour = this.formatDate(new Date())
    const feelingsAsyncStorage = await AsyncStorage.getItem('feelings')
    if (!feelingsAsyncStorage) {
      this.setState({
        hour,
        feelings: this.state.feelingsArray,
      })
    } else {
      this.setState({
        hour,
        feelingsArray: JSON.parse(feelingsAsyncStorage),
        feelings: JSON.parse(feelingsAsyncStorage),
      })
    }
  }

  async componentDidMount() {
    await this.setAsyncStorageFeelings()
    if (this.props.mood) {
      this.checkEditing()
    }
  }

  setMood(mood) {
    this.setState({
      mood,
    })
  }

  setFeeling(feeling) {
    let { feelingsArray } = this.state
    const index = feelingsArray.indexOf(feeling)
    if (index !== -1) feelingsArray[index].selected = !feelingsArray[index].selected
    this.setState({
      feelingsArray,
      feelings: feelingsArray,
    })
  }

  setNote(note) {
    this.setState({
      note,
    })
  }

  componentDidDisappear() {
    if (this.props.mood) {
      entryMood(this.state.mood, this.state.feelings, this.state.note, this.state.hour, this.props.selectedDay)
    }
  }

  componentDidAppear() {
    this.props.mood ? this.checkEditing() : this.checkFeelings()
  }

  checkEditing = () => {
    if (this.props.mood) {
      this.setState({
        mood: this.props.mood,
        feelings: this.props.feelings,
        feelingsArray: this.props.feelings,
        date: this.props.date,
        note: this.props.note,
        hour: this.props.hour,
        timestamp: this.props.timestamp,
      })
    }
  }

  checkFeelings = async () => {
    const feelingsAsyncStorage = await AsyncStorage.getItem('feelings')
    if (!feelingsAsyncStorage) {
      this.storeFeeling(this.state.feelingsArray)
    } else {
      this.setState({
        feelingsArray: JSON.parse(feelingsAsyncStorage),
      })
    }
  }

  hideDateTimePicker = date => {
    const hour = this.formatDate(date || new Date())
    this.setState({ isHourPickerVisible: false, hour })
  }

  showDateTimePicker = () => {
    this.setState({ isHourPickerVisible: true })
  }

  goAddEditFeelings = () => {
    const context = { props: { componentId: 'Home.Home' } }
    const data = {
      hideBottomBar: true,
      name: 'Home.FeelingAddEdit',
      alignment: 'center',
      title: 'Feelings',
    }
    Stack.push(context, data)
  }

  render() {
    const { moodNumbers, isHourPickerVisible, mood, note, hour, feelingsArray, feelings } = this.state
    return (
      <View style={styles.wrapper}>
        <HourPicker isHourPickerVisible={isHourPickerVisible} hideDateTimePicker={this.hideDateTimePicker}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
          <TouchableOpacity
            onPress={this.showDateTimePicker}
            style={styles.containerPickerHour}>
            <Text text={hour} allowStyles style={styles.hour}/>
          </TouchableOpacity>
          <View style={styles.containerMood}>
            <View style={styles.containerText}>
              <Text text={'How would you rate your mood?'} allowStyles style={styles.text}/>
            </View>
            <View style={styles.containerNumbers}>
              {
                moodNumbers.map((item, index) => (
                  <View style={styles.containerMoodColumn} key={index}>
                    <View style={styles.containerSvg}>
                      <Image source={moods[index]} style={theme.img} resizeMode={'center'}/>
                    </View>
                    <TouchableOpacity
                      style={[styles.containerMoodBtn,
                        item[0] === mood && styles.moodSelected && { backgroundColor: item[2] },
                        { marginBottom: 10, borderColor: item[2] }]}
                      onPress={() => this.setMood(item[0])}>
                      <Text text={item[0].toString()} allowStyles style={[item[0] === mood ? { color: 'black' } : { color: item[2] },
                        styles.moodNumber]}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.containerMoodBtn,
                        item[1] === mood && styles.moodSelected && { backgroundColor: item[2] },
                        { borderColor: item[2] }]}
                      onPress={() => this.setMood(item[1])}>
                      <Text text={item[1].toString()} allowStyles style={[item[1] === mood ? { color: 'black' } : { color: item[2] },
                        styles.moodNumber]}/>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
          </View>
          {
            mood &&
            <React.Fragment>
              <View style={styles.containerFeelings}>
                <View style={styles.containerText}>
                  <Text text={'How are you feeling?'} allowStyles style={styles.text}/>
                </View>
                <View style={styles.containerNumbers}>
                  <TouchableOpacity
                    style={[styles.containerFeeelingdBtn]}
                    onPress={this.goAddEditFeelings}
                  >
                    <Text text={'+ Add/Edit'} allowStyles style={styles.moodOptions}/>
                  </TouchableOpacity>
                  {
                    feelingsArray.map((item, index) => (
                      item.on &&
                      <TouchableOpacity
                        key={index}
                        style={[styles.containerFeeelingdBtn, item.selected && styles.moodSelected]}
                        onPress={() => this.setFeeling(item)}>
                        <Text text={item.name} allowStyles style={styles.moodOptions}/>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
              <View style={styles.containerNote}>
                <TextInput
                  multiline={true}
                  style={styles.input}
                  placeholder={'Add note..'}
                  onChangeText={text => this.setNote(text)}
                  value={note}
                />
              </View>
            </React.Fragment>
          }
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = {
  entryMood: entryMood,
}

const MapStateToProps = state => {
  return {
    calendar: state.HomeScene.calendar,
    selectedDay: state.HomeScene.selectedDay,
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(Mood)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  containerPickerHour: {
    backgroundColor: '#2D2F88',
    height: 50,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    width: '100%',
  },
  hour: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  containerSvg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 26,
    marginBottom: theme.spacing(1.2),
  },
  text: {
    color: theme.colors.darkBlue,
  },
  containerText: {
    padding: 20,
  },
  containerNumbers: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',

  },
  containerMood: {
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    alignItems: 'center',
    flexWrap: 'nowrap',
    flex: 1,
    justifyContent: 'center',
  },
  containerFeelings: {
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFeeelingdBtn: {
    alignSelf: 'center',
    margin: theme.spacing(0.6),
    height: 40,
    padding: 20,
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 10,
    borderColor: '#E5E5E5',
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    margin: theme.spacing(2.5),
    paddingLeft: 10,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
  },
  containerMoodColumn: {
    padding: 10,
  },
  containerMoodBtn: {
    height: 40,
    width: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
  },
  moodNumber: {

  },
  moodOptions: {
    color: theme.colors.darkBlue,
    fontSize: 12,
  },
  feelingOption: {
  },
  moodSelected: {
    backgroundColor: theme.colors.mood.lightGreen,
  },
})

