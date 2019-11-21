/* eslint func-names: 'off' */
/* eslint global-require: 'off' */
import React from 'react'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from 'lib/indicators/Loading'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import Settings from '_appSetup/Settings'

import { Session } from 'redux/Session'
import { AppStatus } from 'redux/AppStatus'
import { Profiles } from 'redux/Profiles'

import { HomeScene } from 'redux/HomeScene'
import { Entries } from 'redux/Entries'
import { UserConfig } from 'redux/UserConfig'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}

const allReducers = combineReducers({
  Session,
  HomeScene,
  AppStatus,
  Profiles,
  UserConfig,
  // Hamburger,
  Entries,
})

const reducers = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }
  return allReducers(state, action)
}

const middleware = __DEV__ && Settings.WARN_ILLEGAL_STATE_MUTATIONS ?
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk]

const persistedReducer = persistReducer(persistConfig, reducers)
export let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
export let persistor = persistStore(store)

export const ReduxComponent = (Component, props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <Component {...props}/>
      </PersistGate>
    </Provider>
  )
}

export function addOrUpdate(state, newObject) {
  let updated = false
  for (const s in state) {
    if (state[s].id == newObject.id) {
      state[s] = newObject
      updated = true
    }
  }
  if (!updated) {
    state.push(newObject)
  }
  return state
}

export function merge(state, arr) {
  for (const a in arr) {
    addOrUpdate(state, arr[a])
  }
  return state
}
