/* eslint prefer-const: 'off' */

const initialState = {
  selectedDay: new Date(),
}

export const HomeScene = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DAY':
      return {
        ...state,
        selectedDay: action.data,
      }
    default:
      return state
  }
}