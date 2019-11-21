const initialState = {
  activity: null,
  fullscreen: false,
}

export const AppStatus = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case 'SET_APP_ACTIVITY_STATUS':
      newState.activity = action.activity
      newState.fullscreen = action.fullscreen ? action.fullscreen : false
      return newState
    case 'SET_MODAL':
      newState.showModal = action.showModal
      return newState
    default:
      return state
  }
}
