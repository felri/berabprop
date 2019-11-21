import { store } from 'redux/_root'
import { DateUtils } from 'lib'

export function entryFactor(category, name, date = null) {
  store.dispatch({ type: 'ENTRY_FACTOR', category, name, date })
}

export function entryWater(amount, date = null) {
  store.dispatch({ type: 'ENTRY_WATER', amount, date })
}

export function entryFood(text, timeOfDay, date = null) {
  store.dispatch({ type: 'ENTRY_FOOD', text, timeOfDay, date })
}

export function entryDifficulty(name, severity = 0, timeOfDay, date = null) {
  store.dispatch({ type: 'ENTRY_DIFFICULTY', name, severity, timeOfDay, date })
}

export function entryMood(mood, feelings = [], note = null, hour = null, date = null) {
  store.dispatch({ type: 'ENTRY_MOOD', mood, feelings, note, hour, date })
}

export function entrySignificantEvent(description, sentiment, note = null, date = null) {
  store.dispatch({ type: 'ENTRY_SIGNIFICANT_EVENT', description, sentiment, note, date })
}

export function entryMedication(amount, med, timestamp, date = null) {
  store.dispatch({ type: 'ENTRY_MEDICATION', amount, med, timestamp, date })
}

export function removeMedication(entry, date = null) {
  store.dispatch({ type: 'REMOVE_MEDICATION', entry, date })
}

export function removeSignificantEvent(e) {
  store.dispatch({ type: 'REMOVE_SIGNIFICANT_EVENT', e, date: DateUtils.YYYYMMDDtoTimestamp(e.date) })
}

export function removeMood(mood, date) {
  let timestamp = mood.timestamp
  store.dispatch({ type: 'REMOVE_MOOD_ENTRY', timestamp, date })
}
