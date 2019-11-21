/* eslint-disable */
import { AsyncStorage, YellowBox } from 'react-native';

// dev settings
const LOG_LEVEL = 'info'; // 'log' (default), 'info' (shows everything) or 'warn' (only shows warnings)
const RN_LOG_LEVEL = 'off'; // 'info' or 'off' for RN logs (yes, I have integrated the RN core with this project)
const REMOTE_DEBUGGER = typeof atob !== 'undefined'; // true if remote debugger is available so the logger knows what to do
const WARN_ILLEGAL_STATE_MUTATIONS = false; // can have a performance impact, disable if necessary - automatically disabled in production

// urls
const BASE_URL =
  'http://project-template-dev.eu-west-2.elasticbeanstalk.com/api/';
// const BASE_URL = 'http://192.168.1.81:8000/api/'
// const BASE_URL = 'http://192.168.0.100:8000/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://victors-mbp:8000/api/'

// other
console.disableYellowBox = true;

// dates
const DAYS_WEEK_NAME_ARRAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// image uploads
const AVATAR_IMAGE_OPTIONS = {
  includeBase64: true,
  compressImageQuality: 0.8,
  mediaType: 'photo',
  width: 800,
  height: 800,
  cropping: true
};

// exports so we know what's in here this fuck
export default {
  RN_LOG_LEVEL,
  LOG_LEVEL,
  DAYS_WEEK_NAME_ARRAY,
  MONTHS,
  BASE_URL,
  REMOTE_DEBUGGER,
  AVATAR_IMAGE_OPTIONS,
  WARN_ILLEGAL_STATE_MUTATIONS
};
