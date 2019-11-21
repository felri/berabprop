import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')

const hasNotch = Platform.OS === 'ios' ? ((Dimensions.get('window').height >= 812)) : false
const spacingUnit = 8

// import { UIValues } from '_appSetup/Theme'
export const UIValues = {
  width: width,
  height: height,
  containerMargin: 16,
  containerPadding: 16,
  itemMargin: 10,
  itemPadding: 15,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '#ccc', // COMBAK REMOVE THIS AND KEEP ALL COLORS IN ONE PLACE (const Colors)
  containerBorderRadius: 10,
  itemBorderRadius: 10,
  marginTop: Platform.OS === 'ios' ? (hasNotch ? 34 : 20) : 0,
  marginBottom: hasNotch ? 20 : 0,
  keyboardVerticalOffset: Platform.OS === 'ios' ? -50 : -100,
}

// import { theme } from '_appSetup/Theme'
export const theme = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menuItemWrapper: {
    padding: UIValues.itemPadding,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  full: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  elevated: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 4,
  },
  elevatedDark: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 20,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingWrapper: {
    margin: UIValues.containerMargin,
    marginBottom: 0,
    borderRadius: UIValues.itemBorderRadius,
    padding: UIValues.itemPadding,
    backgroundColor: '#fff',
  },
  containerCollapsible: {
    width: '100%',
    height: 20,
    backgroundColor: '#F7F7FF',
  },
  containerCard: {
    padding: 16,
    flex: 1,
  },
  fonts: {
    main: 'Montserrat-Regular',
  },
  colors: {
    darkBlue: '#19345D',
    black: '#030303', // off black
    darkest: '#333',
    veryDark: '#0d0f0f',
    midDark: '#2d3436',
    base: '#636e72',
    midLight: '#b2bec3',
    veryLight: '#dfe6e9',
    lightest: '#ecf3f5',
    white: '#fdfdfd', // off white
    grey: '#777',
    greyLine: '#D1D6DF',
    lightGrey: '#aaa',
    light: '#dedede',
    sig: {
      green: '#3BB7B0',
      grey: '#9CA7BA',
      pink: '#FF8787',
    },
    mood: {
      pink: '#FF8787',
      orange: '#ffb07e',
      yellow: '#ffd73d',
      lightGreen: '#61d398',
      darkGreen: '#25b8b0',
    },
    difficulties: {
      darkGreen: '#25b8b0',
      lightGreen: '#a0f1eb',
      lightPink: '#FFB8CD',
      darkPink: '#ff8488',
      red: '#db4e53',
    },
    background: '#f4f4f8',
    boxes: '#ffffff',
    text: '#19345D',
    highlighting: '#6177ed',
    confirm: '#25b8b0',
    topMenu: {
      light: '#3648a3',
      dark: '#243484',
    },
    buttonBorder: '#B7C0D3',
  },
  spacing: (value) => {
    return value * spacingUnit
  },
  circle: (side) => ({
    width: side,
    height: side,
    borderRadius: side / 2,
  }),
}

