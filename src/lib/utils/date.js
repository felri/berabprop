const timestampToYYYYMMDD = (timestamp) => {
  const d = new Date(timestamp)
  return `${d.getFullYear() + twoDigits(d.getMonth() + 1) + twoDigits(d.getDate())}` // format YYYYMMDD
}

const jsDateToHumanTime = (d) => {
  let date = new Date(d)
  return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
}

const YYYYMMDDtoHuman = (date) => {
  let result = []
  result.push(trimStartingZero(date.substr(6, 2))) // day
  const monthArr = ['buffer', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  result.push(monthArr[trimStartingZero(date.substr(4, 2))]) // month
  result.push(date.substr(0, 4)) // year
  return result.join(' ')
}

const YYYYMMDDtoTimestamp = (date) => {
  return new Date(
    parseInt(date.substr(0, 4)),
    parseInt(date.substr(4, 2)) - 1,
    parseInt(date.substr(6, 2))
  )
}

const daysBetweenDates = (a, b) => {
  return Math.floor((b - a) / (1000 * 60 * 60 * 24))
}

const trimStartingZero = (str) => {
  if (str[0] == '0') return parseInt(str[1])
  return parseInt(str)
}

const twoDigits = (base) => {
  if (`${base}`.length == 1) {
    return `0${base}`
  } else {
    return `${base}`
  }
}

const getDateArray = (start, end) => {
  // create array of dates for calendar
  let arr = new Array()
  let dt = new Date(start)
  while (dt > end) {
    arr.push(new Date(dt))
    dt.setDate(dt.getDate() - 1)
  }
  return arr.reverse()
}

const setCalendar = () => {
  let startDate = new Date()
  let endDate = new Date()
  endDate.setDate(endDate.getDate() - 30)
  const calendar = getDateArray(startDate, endDate)
  return calendar
}

export default {
  timestampToYYYYMMDD,
  jsDateToHumanTime,
  YYYYMMDDtoHuman,
  YYYYMMDDtoTimestamp,
  daysBetweenDates,
  setCalendar,
}
