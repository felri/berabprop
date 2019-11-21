/* eslint no-console: "off" */
import Settings from '_appSetup/Settings'
import callsites from 'callsites'

/**
 * How to use the global logger things
 *
 * @global log() => log('key', value) // always appear in console as log
 * @global warn() => warn('key', value) // will always appear in console as warning
 * @global info() => info('key', value) // only appears if options is enabled
 * @global error() => error('string') // only appears if options is enabled
 */

const IGNORED_WARNINGS = [
  'Require cycle:',
]

global.log = (key, value) => {
  customLogger(key, value, 'log')
}

global.warn = (key, value) => {
  customLogger(key, value, 'warn')
}

global.info = (key, value) => {
  customLogger(key, value, 'info')
}

global.error = (key, value) => {
  customLogger(key, value, 'error')
}

function callFuncWithArgs(logger, ...args) {
  logger(...args)
}

export default function customLogger(key, value, type) {
  if (__DEV__ == true && Settings.REMOTE_DEBUGGER) {
    if (!value) {
      value = key
      if (typeof key == 'object') {
        const keys = Object.keys(key)
        const firstKey = keys[0]
        if (keys.length == 1) {
          value = key[firstKey]
          key = firstKey
        } else {
          key = ''
        }
      } else {
        key = ''
      }
    }
    // const cs = callsites()
    // for (const c in cs) {
    //   console.log('func', cs[c].getFunctionName())
    // }
    const funcName = callsites()[2].getFunctionName() // COMBAK find a way of getting the callsites that works on the device's JS engine
    const caller = funcName ? funcName + '() ' : 'global'
    const titleStr = caller + key
    if (type == 'error' || type == 'warn') {
      let title
      const logger = console.warn
      if (type == 'error') {
        title = '[ERROR] ' + titleStr
      } else if (type == 'warn') {
        title = '[WARN] ' + titleStr
      }
      callFuncWithArgs(logger, title, value)
      if (type == 'error') {
        throw title
      }
    } else {
      let title
      let titleStyle
      const logger = console.log
      if (type == 'log' && Settings.LOG_LEVEL != 'warn') {
        title = '%c[LOG] ' + titleStr
        titleStyle = 'color: #fdcb6e'
      } else if (type == 'info' && Settings.LOG_LEVEL == 'info') {
        title = '%c[INFO] ' + titleStr
        titleStyle = 'color: #74b9ff'
      }
      callFuncWithArgs(logger, title, titleStyle, value)
    }
  }
  // TODO sentry and analytics shit here
  // captureBreadcrumb({
  //   message: type,
  //   category: 'Log',
  //   data: { js_context, data },
  // })
  // if (type == 'ER') {
  //   captureException('[ERROR] Log() >>> see previous breadcrumb')
  // }
}

// ignores some warnings to make shit less annoying
if (__DEV__) {
  const oldConsoleWarn = console.warn
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      IGNORED_WARNINGS.some(ignoredWarning => args[0].startsWith(ignoredWarning))
    ) {
      return
    }
    return oldConsoleWarn.apply(console, args)
  }
}
