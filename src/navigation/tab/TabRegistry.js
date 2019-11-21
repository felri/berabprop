import { Navigation } from 'react-native-navigation'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

// vars
const iconColor = '#C0BFC6'
const selectedColor = '#6C70F3'
const iconSize = 16
const fontSize = 10
const fontFamily = 'sf-pro-text-regular'

// describe everything here
const NOTIFICATIONS_TAB_INDEX = 4

const tabs = [
  { id: 'Home.Home', text: 'Home', icon: null },
  { id: 'Home.TimeLine', text: 'Timeline', icon: null },
  { id: 'Home.Calendar', text: 'Calendar', icon: null },
  { id: 'Home.Insights', text: 'Insights', icon: null }
]

// defines what each tab is (a stack)
function addStack(params) {
  return {
    stack: {
      children: [{
        component: {
          id: params.id,
          name: params.id,
          options: {
            bottomTab: {
              fontSize: fontSize,
              fontFamily: fontFamily,
              text: params.text,
              icon: params.icon,
              iconColor: iconColor,
              selectedIconColor: selectedColor,
              textColor: iconColor,
              selectedTextColor: selectedColor,
            },
          },
        },
      }],
    },
  }
}

// transforms vector icons in actual images and adds them to tabs obj
async function loadTabBarIcons() {
  return await Promise.all([
    FontAwesome.getImageSource('home', iconSize, iconColor),
    MaterialCommunityIcons.getImageSource('restore-clock', iconSize, iconColor),
    MaterialCommunityIcons.getImageSource('calendar-month-outline', iconSize, iconColor),
    FontAwesome.getImageSource('pie-chart', iconSize, iconColor),
  ]).then(images => {
    for (const t in tabs) {
      tabs[t].icon = images[t]
    }
    return true
  }).catch((error) => {
    warn(error)
  })
}

// adds everything together creating tabs in Navigation
function createTabs() {
  const children = tabs.map(i => addStack(i))
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            visible: true,
            drawBehind: true,
          }
        },
        children: children,
      },
    },
  })
}

export default {
  loadTabBarIcons,
  createTabs,
  NOTIFICATIONS_TAB_INDEX,
}
