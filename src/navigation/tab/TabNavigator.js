import { Navigation } from 'react-native-navigation'
import TabRegistry from './TabRegistry'
import { Notifications } from 'lib'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

// defines styles (even for topBar) https://wix.github.io/react-native-navigation/#/docs/styling
async function setDefaultNavSettings() {
  const iconColor = 'white'
  const iconsTopBar = await Promise.all([
    FontAwesome.getImageSource('gear', 30, iconColor),
    FontAwesome5.getImageSource('exclamation-circle', 25, iconColor),
    MaterialIcons.getImageSource('insert-chart', 30, iconColor),
  ]).then(images => {
    let icons = []
    for (const t in images) {
      icons.push(images[t])
    }

    return icons
  }).catch((error) => {
    warn(error)
  })
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#3F42A7',
      visible: true,
      style: 'light',
    },
    topBar: {
      title: {
        color: '#ffffff',
        fontFamily: 'sf-pro-text-heavy',
      },
      rightButtons: [
        {
          id: 'Settings',
          icon: iconsTopBar[0],
        },
        {
          id: 'SignificantEvents',
          icon: iconsTopBar[1],
        },
        {
          id: 'chart',
          icon: iconsTopBar[2],
        },
      ],
      background: {
        // translucent: true, // [IOS]
        // blur: true, // [IOS]
        // elevation: 8, // [ANDROID]
        color: '#3F42A7',
      },
    },
    bottomTabs: {
      backgroundColor: '#fefefe',
      // translucent: true, // [IOS]
      // hideShadow: true, // [IOS]
      // elevation: 8, // [ANDROID]
      titleDisplayMode: 'alwaysShow', // [ANDROID] alwaysShow | showWhenActive | alwaysHide
    },
    layout: {
      orientation: ['portrait'],
    },
  })
}

// function that's actually executed from outside
export function registerTabComponents() {
  startMainAppNavigator()
  setHomeComponent()
}

// effectively initializes app
function startMainAppNavigator() {
  TabRegistry.loadTabBarIcons().then(() => {
    TabRegistry.createTabs()
    Notifications.checkPermissions()
  }).catch((error) => {
    warn(error)
  })
}

function setSignupComponent() {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Profile.Signup',
      },
    },
  })
}

function setLoginComponent() {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Profile.Login',
      },
    },
  })
}


function setHomeComponent() {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Home.Home',
      },
    },
  })
}

export default {
  setDefaultNavSettings,
  startMainAppNavigator,
  setSignupComponent,
  setLoginComponent,
  setHomeComponent,
  registerTabComponents,
}
