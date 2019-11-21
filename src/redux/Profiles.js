/* eslint prefer-const: 'off' */

export const Profiles = (state = {}, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case 'RECEIVE_PROFILE':
      newState[action.data.id] = action.data
      return newState
    default:
      return state
  }
}
