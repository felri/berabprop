import { merge } from 'redux/_root'

const Notifications = (state = [], action) => {
  const newState = Object.assign([], state)
  const { data, type } = action
  switch (type) {
    case 'RECEIVE_NOTIFICATIONS':
      merge(newState, data)
      return newState
    default:
      return state
  }
}

const NotificationsManager = (state = { badge: 0 }, action) => {
  const newState = Object.assign({}, state)
  const { type } = action
  switch (type) {
    case 'UPDATE_BADGE':
      newState.badge = action.badge
      return newState
    default:
      return state
  }
}

export default {
  Notifications,
  NotificationsManager,
}
