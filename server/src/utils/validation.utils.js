
/* regex for atleast on small letter , capital letter,
a digit and a special character.
password must be  atleast 8 characters long */
const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

const isValidPassword = (password) => {    
    
    return passwdRegex.test(password)
}
/// used to form an object from the given object by only including the keys given.
const pick = (obj,keys) => {
    if (keys == undefined) {
        return {}
    }
    return keys.reduce((initialObj,key) => {
        if(obj && Object.prototype.hasOwnProperty.call(obj,key)){
            initialObj[key] = obj[key]
        }
        return initialObj
    },{})
}

module.exports = { isValidPassword, passwdRegex, pick }