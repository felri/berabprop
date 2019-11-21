/* eslint prefer-const: 'off' */
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
  factor: {
    items: [
      { sectionName: 'General',
        sectionIcon: require('assets/images/factors/general.png'),
        sectionFactors: [
          { name: 'Work', shown: true },
          { name: 'TV', shown: true },
          { name: 'Reading', shown: true },
          { name: 'Cooking', shown: true },
          { name: 'Cleaning', shown: true },
          { name: 'Meditating', shown: false },
          { name: 'Studying', shown: false },
          { name: 'Shopping', shown: false },
          { name: 'Music', shown: false },
          { name: 'Social Media', shown: false },
          { name: 'Video games', shown: false },
        ] },
      { sectionName: 'Diet',
        sectionIcon: require('assets/images/factors/diet.png'),
        sectionFactors: [
          { name: 'Healthy', shown: true },
          { name: 'Fasted', shown: true },
          { name: 'High sugar', shown: true },
          { name: 'Junk food', shown: true },
          { name: 'Ate too much', shown: true },
          { name: 'Vegetarian', shown: false },
          { name: 'Meat', shown: false },
          { name: 'Dairy-free', shown: false },
          { name: 'Gluten-free', shown: false },
          { name: 'Alcohol', shown: false },
          { name: 'Freshly prepared', shown: false },
          { name: 'Microwave ready meal', shown: false },
        ] },
      { sectionName: 'Sleep',
        sectionIcon: require('assets/images/factors/sleep.png'),
        sectionFactors: [
          { name: 'Woke fully refreshed', shown: true },
          { name: 'Woke mid-sleep', shown: true },
          { name: 'Woke still tired', shown: true },
          { name: 'Nightmare', shown: true },
          { name: '7+ Hours', shown: true },
          { name: '5-6 Hours', shown: true },
          { name: '3-5 Hours', shown: true },
          { name: '1-3 Hours', shown: true },
          { name: 'Early bedtime', shown: false },
          { name: 'Trouble falling asleep', shown: false },
          { name: 'Trouble staying asleep', shown: false },
          { name: 'Sleep interrupted', shown: false },
        ] },
      { sectionName: 'Active',
        sectionIcon: require('assets/images/factors/active.png'),
        sectionFactors: [
          { name: 'Highly active', shown: true },
          { name: 'Quite active', shown: true },
          { name: 'Low activity', shown: true },
          { name: 'Sedentary', shown: true },
          { name: 'Gym', shown: true },
          { name: 'Walk', shown: true },
          { name: 'Run', shown: true },
          { name: 'Cycling', shown: false },
          { name: 'Yoga', shown: false },
          { name: 'Dog walk', shown: false },
          { name: 'Weights', shown: false },
          { name: 'Football', shown: false },
          { name: 'Swim', shown: false },
          { name: 'Climbing', shown: false },
        ] },
      { sectionName: 'Appointments',
        sectionIcon: require('assets/images/factors/appointments.png'),
        sectionFactors: [
          { name: 'Doctor', shown: true },
          { name: 'Dentist', shown: true },
          { name: 'Haircut', shown: true },
          { name: 'Physio', shown: false },
          { name: 'Psychotherapy', shown: false },
          { name: 'Massage', shown: false },
        ] },
      { sectionName: 'Social',
        sectionIcon: require('assets/images/factors/social.png'),
        sectionFactors: [
          { name: 'Mostly alone', shown: true },
          { name: 'With family', shown: true },
          { name: 'With friends', shown: true },
          { name: 'With partner', shown: false },
          { name: 'With best friend', shown: false },
          { name: 'With co-workers', shown: false },
        ] },
    ],
  },
  food: [
    { name: 'Progurt', timeOfDay: 'mid' },
    { name: 'Protein shake', timeOfDay: 'am' },
    { name: 'Protein pancakes', timeOfDay: 'pm' },
    { name: 'Space cake', timeOfDay: 'pm' },
    { name: 'Honest burger', timeOfDay: 'mid' },
    { name: 'Egg', timeOfDay: 'am' },
    { name: 'Sriracha', timeOfDay: 'mid' },
  ],
  difficulties: {
    items: [
      { name: 'Stress', shown: true },
      { name: 'Abdominal pain', shown: true },
      { name: 'Acid reflux', shown: true },
      { name: 'Acne', shown: false },
      { name: 'Arthritis', shown: false },
      { name: 'Bloating', shown: false },
      { name: 'Back (lower) pain', shown: false },
      { name: 'Back (upper) pain', shown: false },
      { name: 'Chest pain', shown: false },
      { name: 'Cold virus', shown: false },
      { name: 'Constipation', shown: false },
      { name: 'Cough', shown: false },
      { name: 'Depression', shown: false },
      { name: 'Dermatitis', shown: false },
      { name: 'Diarrhea', shown: false },
      { name: 'Dizziness', shown: false },
      { name: 'Drowsiness', shown: false },
      { name: 'Dry mouth', shown: false },
      { name: 'Earache', shown: false },
      { name: 'Eczema', shown: false },
      { name: 'Eye pain', shown: false },
      { name: 'Fatigue', shown: false },
      { name: 'Fever', shown: false },
      { name: 'Flatulence', shown: false },
      { name: 'Headache', shown: false },
      { name: 'Heartburn', shown: false },
      { name: 'Heart palpitations', shown: false },
      { name: 'Indigestion', shown: false },
      { name: 'Jaw pain', shown: false },
      { name: 'Joint pain', shown: false },
      { name: 'Migraine', shown: false },
      { name: 'Mouth sores', shown: false },
      { name: 'Nausea', shown: false },
      { name: 'Neck pain', shown: false },
      { name: 'Period pains', shown: false },
      { name: 'Rash', shown: false },
      { name: 'Seizure', shown: false },
      { name: 'Shortness of breath', shown: false },
      { name: 'Sinus congestion', shown: false },
      { name: 'Sore throat', shown: false },
      { name: 'Stomachache', shown: false },
      { name: 'Stomach cramps', shown: false },
      { name: 'Tinnitus', shown: false },
      { name: 'Toothache', shown: false },
      { name: 'Tremors', shown: false },
      { name: 'Vertigo', shown: false },
    ],
  },
  meds: [
    { name: 'Vitamin D', unitAmount: 1000, unit: 'ui' },
    { name: 'Paracetamol', unitAmount: 500, unit: 'mg' },
    { name: 'Omeprazole', unitAmount: 20, unit: 'mg' },
  ],
  mood: {
    backFromOtherScreen: false,
  },
}


export const UserConfig = (state = initialState, action) => {
  let newState = Object.assign([], state)
  switch (action.type) {
    case 'CHANGE_BACK_SCREEN':
      // this react-native-navigation lib does fail sometimes going back on screen,
      // so I need to create this to check if I'm coming back from a screen
      newState.mood.backFromOtherScreen = !state.mood.backFromOtherScreen
      return newState
    case 'FOOD_ADD_FAVOURITE':
      newState.food.push({
        name: action.name,
        timeOfDay: action.timeOfDay,
      })
      return newState
    default:
      return state
  }
}

