import { Navigation } from 'react-native-navigation'
import { tryStatement } from '@babel/types'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

export function push(context, params) {
  Navigation.push(context.props.componentId, {
    component: {
      ...params,
      options: {
        topBar: {
          backButton:
          {
            color: 'white',
          },
          rightButtons: params.rightBtn ? [
            params.rightBtn,
          ] : [],
          title: {
            alignment: params.alignment,
            text: params.title && params.title,
          },
        },
        bottomTabs: {
          visible: !params.hideBottomBar,
        },
        context,
      },
    },
  })
}

export async function pushDataEntryScreen(context, name, title, passProps) {
  let data = {
    hideBottomBar: true,
    name: name,
    alignment: 'center',
    rightBtn: {
      id: 'check',
      icon: null,
    },
    title: title,
  }
  data.passProps = passProps

  data.rightBtn.icon = await Promise.all([
    MaterialIcons.getImageSource('check', 30, 'white'),
  ]).then(images => {
    return images[0]
  }).catch((error) => {
    warn(error)
  })
  push(context, data)
}

export function reset(context, params) {
  Navigation.setStackRoot(context.props.componentId, {
    component: {
      ...params,
    },
    // options: {
    //   animations: {
    //     setStackRoot: {
    //       enabled: false,
    //     },
    //   },
    // },
  })
}

export function popToRoot(context) {
  Navigation.popToRoot(context.props.componentId)
}

export function setTitle(context, title) {
  Navigation.mergeOptions(context.props.componentId, getTitleObj(title))
}

export function pop(context) {
  Navigation.pop(context.props.componentId)
}

export const loadingTitle = getTitleObj('...')

export function getTitleObj(text) {
  return {
    topBar: {
      title: {
        text: text,
      },
    },
  }
}

export default {
  pop,
  popToRoot,
  reset,
  pushDataEntryScreen,
  push,
  setTitle,
  loadingTitle,
  getTitleObj,
}
