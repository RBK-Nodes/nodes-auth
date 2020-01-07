const jwt = require('jsonwebtoken');
require('dotenv').config();


console.log(process.env.ACCESS_TOKEN_SECRET)

const tokenVerifier = (req, res, next) => {
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
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { epiresIn: '15s' })
}
// generateAccessToken({ name: 'Adam' })