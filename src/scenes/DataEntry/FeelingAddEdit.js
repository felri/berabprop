import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text } from 'lib'
import { theme } from '_appSetup/Theme'
import { Navigation } from 'react-native-navigation'
import ToggleSwitch from 'toggle-switch-react-native'

class FeelingAddEdit extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      pose: 'init',
      newFeeling: null,
      feelings: [],
    }
  }

  storeFeeling = async (feelings) => {
    await AsyncStorage.setItem('feelings', JSON.stringify(feelings))
  };

  onChangeInputFeeling = (feeling) => {
    this.setState({
      newFeeling: feeling,
    })
  }

  addFeeling = () => {
    const feelings = this.state.feelings
    let newFeeling = {
      selected: false,
      name: this.state.newFeeling,
      on: true,
    }
    feelings.push(newFeeling)
    this.storeFeeling(feelings)
    this.setState({
      newFeeling,
      newFeeling: null,
    })
  }

  async componentDidMount() {
    const feelingsAsyncStorage = await AsyncStorage.getItem('feelings')
    if (!feelingsAsyncStorage) {
      this.storeFeeling(this.state.feelings)
    } else {
      this.setState({
        feelings: JSON.parse(feelingsAsyncStorage),
      })
    }
  }

  componentDidAppear() {
    this.checkFeelings()
  }

  toogleFeeling(index) {
    const feelings = this.state.feelings
    feelings[index].on = !feelings[index].on
    this.setState({
      feelings,
    })
    this.storeFeeling(feelings)
  }

  checkFeelings = async () => {
    const feelingsAsyncStorage = await AsyncStorage.getItem('feelings')
    if (feelingsAsyncStorage) {
      this.setState({
        feelings: JSON.parse(feelingsAsyncStorage),
      })
    }
  }

  render() {
    const { newFeeling, feelings } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerNote}>
          <TextInput
            style={styles.input}
            placeholder={'Add feeling..'}
            onSubmitEditing={text => this.addFeeling(text)}
            onChangeText={text => this.onChangeInputFeeling(text)}
            ref={ref => { this.input = ref }}
            value={newFeeling}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled={true}>
          {
            (feelings && feelings.length) ? feelings.map((item, index) => (
              <View key={index} style={styles.containerItem}>
                <View style={styles.containerToogle}>
                  <ToggleSwitch
                    isOn={item.on}
                    onColor='#53B7AF'
                    offColor='grey'
                    size='small'
                    onToggle={() => this.toogleFeeling(index)}
                  />
                </View>
                <Text text={item.name} allowStyles style={styles.text} />
              </View>
            )) : null
          }
        </ScrollView>
      </View>
    )
  }
}

export default FeelingAddEdit

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  containerToogle: {

  },
  containerItem: {
    width: '100%',
    padding: theme.spacing(1.6),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    borderTopWidth: 1,
    borderTopColor: '#cfcfcf',
    marginTop: 10,
    paddingBottom: 20,
  },
  containerNote: {
    width: '100%',
  },
  text: {
    marginLeft: theme.spacing(2),
    color: theme.colors.darkBlue,
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    margin: theme.spacing(1.6),
    paddingLeft: 10,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
  },
})

