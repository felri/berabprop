import { Alert } from 'react-native'


/**
 * Alert.{function} receives three parameters, the last one being an object:
 *
 * @param {string} title text to appear in title
 * @param {string} body text to appear in body
 * @param {object} options array of buttons and callbacks
 *
 * options properties
 * @property {string} name object description
 * @property {function} run callback function to run on press
 */

function ask({ title, body, options = null }) {
  requireProperties({ body })
  if (!title) {
    title = 'Quick quetion'
  }
  OSAlert({
    title,
    body,
    options,
  })
}

function warn({ title, body, onAccept, onReject }) {
  requireProperties({ body, onAccept, onReject })
  if (!title) {
    title = 'Hang on'
  }
  OSAlert({
    title,
    body,
    options: [
      {
        text: 'Cancel',
        onPress: () => onReject(),
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => onAccept(),
      },
    ],
  })
}

function info({ title, body, onDismiss = () => null }) {
  requireProperties({ body })
  if (!title) {
    title = 'FYI'
  }
  OSAlert({
    title,
    body,
    options: [
      {
        text: 'OK',
        onPress: () => onDismiss(),
      },
    ],
  })
}

function OSError({ title, body, onDismiss = () => null }) {
  if (!title) {
    title = 'Whoops!'
  }
  if (!body) {
    body = 'Something went wrong'
  }
  OSAlert({
    title,
    body,
    options: [
      {
        text: 'OK',
        onPress: () => onDismiss(),
      },
    ],
  })
}

function OSAlert(params) {
  Alert.alert(
    params.title,
    params.body,
    params.options,
    {
      cancelable: false,
    },
  )
}

function requireProperties(args) {
  const keys = Object.keys(args)
  for (const k in keys) {
    const key = keys[k]
    const item = args[key]
    if (item == undefined) {
      error('Missing argument "' + key + '" on OSAlert.js')
    }
  }
}

export default {
  ask,
  warn,
  info,
  error: OSError,
}
