const validator = require('validator');

const registrationValidation = (user) => {
  let error = {}

  if(!user.name) {
    error.name = `Name can't be empty`
  }

  if(!user.email) {
    error.email = `Email can't be empty`
  }else if(!validator.isEmail(user.email)) {
    error.email = `Must use valid email`
  }

  if(!user.password) {
    error.password = `Password can't be empty`
  }else if(!validator.isLength(user.password,{ min: 6})) {
    error.password = `Password length must be 6 to 12 charecter`
  }

  if(!user.profession) {
    error.profession = `Profession can't be empty`
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

module.exports = registrationValidation;