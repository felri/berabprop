import { store } from 'redux/_root'

export function FoodAddFavourite(name, timeOfDay) {
  store.dispatch({ type: 'FOOD_ADD_FAVOURITE', name, timeOfDay })
}
