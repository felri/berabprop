import OSAlert from 'navigation/overlays/OSAlert'

const modules = {
  validateEmail,
  validateUsername,
  validatePassword,
}

function validateEmail(email) {
  const valid = (/[\w-]+@([\w-]+\.)+[\w-]+/).test(email)
  if (!valid) OSAlert.error({ title: 'Hang on!', body: 'Please enter a valid email address' })
  return valid
}

function validateUsername(input) {
  const regex = (/^[a-z0-9-_]+$/)
  if (input.match(regex)) {
    return true
  } else {
    return false
  }
}

function validatePassword(password) {
  if (password.length < 6) {
    OSAlert.error({ title: 'Oops!', body: 'Your password needs at least 6 characters to be secure' })
    return false
  }
  return true
}

export default modules
