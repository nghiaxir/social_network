const valid = ({ fullname, username, email, password, cf_password }) => {
    const err = {}
    if (!fullname) {
        err.fullname = "Please add your fullname"
    }

    if (!username) {
        err.username = "Please enter your username"
    } else if (fullname.replace(/ /g, '').length > 25) {
        err.fullname = "Username is up to 25 characters long"
    }

    if (!email) {
        err.email = "Please enter your email address"
    } else if (!validateEmail(email)) {
        err.email = "Email format is incorrect"
    }

    if (!password) {
        err.password = "Please enter your password"
    } else if (password.length < 8) {
        err.password = "Password must be at least 8 characters"
    } else if (password.length > 30) {
        err.password = "Password is not longer than 30 characters"
    }

    if (!cf_password) {
        err.cf_password = "Please confirm your password"
    } else if (cf_password !== password) {
        err.cf_password = "Confirm password must be similar to password"
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

export default valid