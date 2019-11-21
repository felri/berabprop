/* eslint no-console: "off" */
/* eslint no-await-in-loop: "off" */

import Settings from '_appSetup/Settings'
import { store } from 'redux/_root'
import AppStatus from 'navigation/overlays/AppStatus'
import OSAlert from 'navigation/overlays/OSAlert'

// import { captureBreadcrumb, captureWarning, captureInfo } from '../utils/sentry'

// TODO update documentation here
// Fetch function input parameters:
//   params: {
//     url: (the_api_url_to_fetch => full_endpoint, suffix on Fetch)
//     method: (http method e.g. GET, POST, UPDATE)
//     data: (*optional* body data)
//     successCallback: (*optional* function to be called when success, sends JSON as argument)
//     failureCallback: (*optional* function to be called if fetch fails)
//     options: {
//       json: (sends json on callback. Default: true),
//       full_url: (uses params.url as the entire fetch url, ignoring endpoint prefix. Default: false)
//     }
//   }

// function setNetworkStatusAction(status, request) {
//   return { type: 'SET_NETWORK_ERROR', status, request }
// }
//
// function shiftNetworkQueueAction() {
//   return { type: 'SHIFT_NETWORK_QUEUE' }
// }

// function setNetworkStatus(status, request) {
//   store.dispatch(setNetworkStatusAction(status, request))
// }
//
// function shiftNetworkQueue() {
//   store.dispatch(shiftNetworkQueueAction())
// }
//
// async function resumeQueue() {
//   const networkManager = await store.getState().Network
//   const queue = networkManager.queue
//   const status = networkManager.status
//   if (queue.length) {
//     if (status == 'error') {
//       setNetworkStatus('connecting')
//     }
//     const request = queue[0]
//     Fetch(request)
//     shiftNetworkQueue()
//   }
// }
//

function appendSlash(url) {
  if (!url.includes('?') && url.charAt(url.length - 1) != '/') {
    url += '/'
  }
  return url
}

async function Fetch(params) {
  // COMBAK fetch only when app is active again
  // const appState = await store.getState().Session.state
  // info('appState', appState)
  // if (appState != 'active') {
  //   setNetworkStatus('skip', params)
  //   return
  // }
  let options = {
    full_url: false,
    json: true,
    multipart: false,
  }
  if (params.hasOwnProperty('options')) {
    options = params.options
  }
  let AUTH_HEADER
  if (options.multipart) {
    AUTH_HEADER = {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
    }
  } else {
    AUTH_HEADER = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }
  const AUTH_TOKEN = await store.getState().Session.token
  if (AUTH_TOKEN) {
    AUTH_HEADER.Authorization = AUTH_TOKEN
  }
  const url = options.full_url ? params.url : appendSlash(Settings.BASE_URL + params.url)
  const data = params.data && (options.multipart ? params.data : JSON.stringify(params.data))
  const headers = params.headers ? params.headers : AUTH_HEADER
  info(params.method, { url, params, headers, data })
  try {
    const response = await fetch(url, {
      method: params.method,
      body: data,
      headers: headers,
    })
    // setNetworkStatus('ok')
    if (response && response.ok) {
      if (params.hasOwnProperty('successCallback')) {
        if (options.json) {
          try {
            const json = await response.json()
            params.successCallback(json)
          } catch (err) {
            warn('> > > > > > INTERNAL ERROR < < < < < <', { err })
            // captureBreadcrumb({
            //   message: 'Processing response error',
            //   category: 'FETCH ERROR',
            //   data: { url, params, response, err },
            // })
            params.successCallback()
          }
        } else {
          params.successCallback()
        }
      }
    } else {
      warn('> > > > > > SERVER ERROR < < < < < <', { AUTH_HEADER, url, params, response })
      // const msg = 'SERVER ERROR ' + response.status
      // captureBreadcrumb({
      //   message: '> > > SERVER ERROR < < <',
      //   category: 'SERVER ERROR',
      //   data: { url, params, response },
      // })
      // captureWarning(msg)
      AppStatus.set(null)
      if (params.hasOwnProperty('failureCallback')) {
        params.failureCallback(response)
      } else if (response._bodyText) {
        OSAlert.error({ body: response._bodyText, onDismiss: () => null })
      }
    }
    // resumeQueue()
  } catch (err) {
    warn('> > > > > > NETWORK ERROR < < < < < <', { AUTH_HEADER, url, params, err })
    // setNetworkStatus('error', params)
    // captureBreadcrumb({
    //   message: '> > > NETWORK ERROR < < <',
    //   category: 'NETWORK ERROR',
    //   data: { url, params, err },
    // })
    // logEvent('NETWORK_ERROR', params)
    // captureInfo('NETWORK_ERROR')
    AppStatus.set(null)
    if (params.hasOwnProperty('failureCallback')) {
      params.failureCallback('NETWORK_ERROR')
    }
  }
}

export default Fetch
