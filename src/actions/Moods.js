import { store } from 'redux/_root';
import AsyncStorage from '@react-native-community/async-storage';

export function setBackFromOtherScreen() {
  // this react-native-navigation lib does fail sometimes going back on screen,
  // so I need to create this to check if I'm coming back from a screen
  store.dispatch({ type: 'CHANGE_BACK_SCREEN' })
}
