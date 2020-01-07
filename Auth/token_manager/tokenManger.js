const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user, next) => {
        if (err) { return res.sendStatus(403) }
        req.user = user;
        next()
    })
}
//genrate refresh Token HERE!!!

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
        // { epiresIn: '15s' }
    )
}
module.exports = {
    generateAccessToken,
    VerifyToken
}