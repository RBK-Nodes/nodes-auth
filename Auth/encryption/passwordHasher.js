const bycrypt = require('bcrypt')
//change this constat to change the salt
var passwordHasher = (plainPassword = '', saltRounds = 0, callback) => {
    // 
    if (!plainPassword.length) {
        return '';
    }
    bycrypt.genSalt(saltRounds, (err, salt) => {
        bycrypt.hash(plainPassword, salt, (err, hash) => {
            if (err) {
                callback(err, null)
            }
            callback(null, hash)
        })
    })
}
module.exports = { passwordHasher }