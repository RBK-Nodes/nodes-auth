const User = require('../../db/model/User.js');
const bcrypt = require('bcryptjs');
const salt = 10;

function findUser(user) {
    return User.find(user)
    .then(result=>{
        if(result.rows.length) {
            return result.rows[0]
        } else {
            throw Error("user not found")
        }
    })
}

function comparePassword(pass, hash) {
    return bcrypt.compare(pass, hash)
}

function saveToDB(user, pass) {
    return bcrypt.hash(pass, salt)
    .then(hash=>{
        return User.create(user, hash)
    })
}






function signUp(user, pass) {
   return findUser(user)
    .then(()=> {
        throw "username already exists"
    })
    .catch((err)=> {
        if(err==="username already exists")
            throw err;
        else
            return saveToDB(user, pass);
    })
}

function signIn(user, pass) {
    return findUser(user)
    .then(userObj=>{
        return comparePassword(pass, userObj.password)
    })
    .then(result=>{
        if(result){
            return true
        } else {
            return false
        }
        
    })
}

module.exports.signIn = signIn;
module.exports.signUp = signUp;
