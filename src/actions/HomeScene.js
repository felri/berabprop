import { store } from 'redux/_root'

export function setDay(data) {
  store.dispatch({ type: 'RECEIVE_DAY', data })
}
