//import the JWT library
const jwt = require('jsonwebtoken');

//A storage to handle active refresh tokens
class Refresh {

    //add a token to the storage, expects the refresh token and the username
    static add(token, user) {
        Refresh._tokens[token] = user;
    }
    //delete a token from storage, expects the refresh token
    static delete(token) {
        delete Refresh._tokens[token]
    }
    //validate the refresh token to see if it exists in memory and if it is assigned to the same username
    static check(token, user) {
        return Refresh._tokens[token] === user;
    }
}
//the refresh storage variable, declared outside due to node not accepting static fields, perhaps outdated version
Refresh._tokens = {};

//generate an access token for the user, returns an object with the token and refresh token
const generateAccessToken = (user) => {
    const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);
    Refresh.add(refreshToken, user);
    return {token, refreshToken};
}

//generates a new token for the user provided the refresh token is valid
const refreshToken = (user, refreshToken) => {
    try {
        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(user, refreshToken)
        if(Refresh.check(refreshToken, user)){
            const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
            console.log('aaaa')
            return token;
        }else 
            return false;

    } catch(err) {
        console.log(err)
        return false;
    }
}

//logout by removing the refresh token from storage, rendering it invalid
const logoutToken = (refreshToken) => {
    Refresh.delete(refreshToken);
}

//A simple wrapper for the JWT verify function, as it throws and error and crashes the program without a try and catch
const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return true;
    } catch {
        return false;
    }
}

module.exports = {
    generateAccessToken,
    refreshToken,
    logoutToken,
    verifyToken
}