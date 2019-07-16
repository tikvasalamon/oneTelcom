const validator = require('validator')
const IsEmpty = require('./is-empty')

createPlanValidator = (data) => {
    let errors = {};

    data.name = !IsEmpty(data.name) ? data.name : '';
    data.internetGg = !IsEmpty(data.internetGg) ? data.internetGg : '';
    data.minInCountry = !IsEmpty(data.minInCountry) ? data.minInCountry : '';
    data.minOutCountry = !IsEmpty(data.minOutCountry) ? data.minOutCountry : '';
    
    if (validator.isEmpty(data.planName)) {
        errors.name = 'name is required'
    }
    
    if (isNaN(data.internetGg)) {
        errors.internetGg = 'internet Gg must be number'
    } else if (data.internetGg < 0) {
        errors.internetGg = 'internet Gg canot be negativ'
    }
    
    if (isNaN(data.minInCountry)) {
        errors.minInCountry = 'min In Country must be number'
    } else if (data.internetGg < 0) {
        errors.minInCountry = 'min In Country canot be negativ'
    }
    
    if (isNaN(data.minOutCountry)) {
        errors.minOutCountry = 'min Out Country must be number'
    } else if (data.internetGg < 0) {
        errors.minOutCountry = 'min Out Country canot be negativ'
    }

    if (isNaN(data.price)) {
        errors.price = 'price must be number'
    } else if (data.internetGg < 0 || data.internetGg === 0) {
        errors.price = 'price must be greater then 0'
    }

    if (data.internetGg === 0 && data.minInCountry === 0 && data.minOutCountry === 0) {
        errors.emptyPlan = 'one of the fields must be greater then 0'
    }
    
    return {
        errors,
        isValid : IsEmpty(errors)
    };
}

module.exports = {
    createPlanValidator: createPlanValidator
};