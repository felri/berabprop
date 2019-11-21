/* eslint prefer-const: 'off' */

import { DateUtils } from 'lib'

const initialState = {}

// TODO abstract the "remove if exists" function

export const Entries = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  const dateKey = DateUtils.timestampToYYYYMMDD(action.date || Date.now())
  if (!newState[dateKey]) newState[dateKey] = []

  let exists = null

  switch (action.type) {
    case 'ENTRY_FACTOR':
      exists = newState[dateKey].find(f => f.type == 'FACTOR' && f.name == action.name)
      if (exists) {
        newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      } else {
        newState[dateKey].push({
          type: 'FACTOR',
          category: action.category,
          name: action.name,
        })
      }
      return newState

    case 'ENTRY_WATER':
      exists = newState[dateKey].find(f => f.type == 'WATER' && f.name == action.name)
      if (exists) newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      newState[dateKey].push({
        type: 'WATER',
        amount: action.amount,
      })
      return newState

    case 'ENTRY_FOOD':
      exists = newState[dateKey].find(f => f.type == 'FOOD' &&
        f.timeOfDay == action.timeOfDay
      )
      if (exists) newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      newState[dateKey].push({
        type: 'FOOD',
        timeOfDay: action.timeOfDay,
        text: action.text,
      })
      return newState

    case 'ENTRY_DIFFICULTY':
      exists = newState[dateKey].find(f => f.type == 'DIFFICULTY' &&
        f.name == action.name &&
        f.timeOfDay == action.timeOfDay
      )
      if (exists) newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      newState[dateKey].push({
        type: 'DIFFICULTY',
        timeOfDay: action.timeOfDay,
        name: action.name,
        severity: action.severity,
      })
      return newState

    case 'ENTRY_SIGNIFICANT_EVENT':
      newState[dateKey].push({
        type: 'SIGNIFICANT_EVENT',
        description: action.description,
        sentiment: action.sentiment,
        note: action.note,
      })
      return newState

    case 'ENTRY_MEDICATION':
      newState[dateKey].push({
        type: 'MEDICATION',
        amount: action.amount,
        med: action.med,
        timestamp: action.timestamp,
      })
      return newState

    case 'REMOVE_MEDICATION':
      exists = newState[dateKey].find(f => f.type == 'MEDICATION' &&
        f.amount == action.entry.amount &&
        f.med.name == action.entry.med.name &&
        f.timestamp == action.entry.timestamp
      )
      if (exists) newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      return newState

    case 'REMOVE_SIGNIFICANT_EVENT':
      exists = newState[dateKey].find(f => f.type == 'SIGNIFICANT_EVENT' &&
        f.description == action.e.description &&
        f.sentiment == action.e.sentiment
      )
      if (exists) newState[dateKey].splice(newState[dateKey].indexOf(exists), 1)
      return newState

    case 'ENTRY_MOOD':
      newState[dateKey].push({
        type: 'MOOD',
        mood: action.mood,
        feelings: action.feelings,
        note: action.note,
        hour: action.hour,
        date: action.date,
        timestamp: new Date(),
      })
      return newState

    case 'REMOVE_MOOD_ENTRY':
      const timestamp = newState[dateKey].find(f => f.timestamp && f.timestamp == action.timestamp)
      if (timestamp) {
        newState[dateKey].splice(newState[dateKey].indexOf(timestamp), 1)
      }
      return newState
    case 'PURGE':
      return initialState
    default:
      return state
  }
}
