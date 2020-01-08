const jwt = require('jsonwebtoken');

class Refresh {

    static add(token, user) {
        Refresh._tokens[token] = user;
    }

    static delete(token) {
        delete Refresh._tokens[token]
    }

    static check(token, user) {
        return Refresh._tokens[token] === user;
    }
}
Refresh._tokens = {};

const generateAccessToken = (user) => {
    const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);
    Refresh.add(refreshToken, user);
    return {token, refreshToken};
}

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

const logoutToken= (refreshToken) => {
    Refresh.delete(refreshToken);
}

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