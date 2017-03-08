const validator = require('validator');

const validateSignUp = ({username, password, passwordConfirmation}) => {
    let errors = {};

    if (validator.isEmpty(username)) {
        errors.username = 'Username field is required';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'Password field is required';
    } else if (!validator.isLength(password, {min: 5, max: undefined})) {
        errors.password = 'The minimum password length is 6 characters';
    }

    if (validator.isEmpty(passwordConfirmation)) {
        errors.passwordConfirmation = 'Password Confirmation field is required';
    } else if (!validator.equals(passwordConfirmation, password)) {
        errors.passwordConfirmation = 'The password does not match';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    };

};

const validateSignIn = ({username, password}) => {
    let errors = {};

    if (validator.isEmpty(username)) {
        errors.username = 'Username field is required';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'Password field is required';
    } else if (!validator.isLength(password, {min: 5, max: undefined})) {
        errors.password = 'The minimum password length is 5 characters';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    };
};

module.exports = {
    validateSignIn, validateSignUp
};