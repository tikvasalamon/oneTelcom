const validator = require('validator')
const IsEmpty = require('./is-empty')

registerValidator = (data) => {
    let errors = {};

    data.firstName = !IsEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !IsEmpty(data.lastName) ? data.lastName : '';
    data.dateOfBirth = !IsEmpty(data.dateOfBirth) ? data.dateOfBirth : '';
    data.address = !IsEmpty(data.address) ? data.address : '';
    data.city = !IsEmpty(data.city) ? data.city : '';
    data.id = !IsEmpty(data.id) ? data.id : '';
    data.password = !IsEmpty(data.password) ? data.password : '';
    data.password2 = !IsEmpty(data.password2) ? data.password2 : '';

    if (validator.isEmpty(data.firstName) || validator.isNumeric(data.firstName)) {
        console.log('gggg')
        errors.firstName = 'first name is not currect'
    }

    if (validator.isEmpty(data.lastName) || validator.isNumeric(data.lastName)) {
        errors.lastName = 'last name is not currect'
    }

    if (validator.isEmpty(data.dateOfBirth) || !validator.isISO8601(data.dateOfBirth)) {
        errors.dateOfBirth = 'date is not currect'
    }

    if (validator.isEmpty(data.address) || validator.isNumeric(data.address)) {
        errors.address = 'address is not currect'
    }

    if (validator.isEmpty(data.city) || validator.isNumeric(data.city)) {
        errors.city = 'city is not currect'
    }

    if (validator.isEmpty(data.id) || data.id.length != 9) {
        errors.id = 'id is not currect'
    }

    if (validator.isEmpty(data.password) || data.password.length < 5) {
        errors.password = 'password is not currect'
    }

    if (data.password != data.password2) {
        errors.passwordConfirm = 'password confirm is not currect'
    }

    return {
        errors,
        isValid : IsEmpty(errors)
    };
}

module.exports = {
    registerValidator: registerValidator,
};