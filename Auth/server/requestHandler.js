const User = require('./controller/User');
const tokens = require('../token_manager/tokenManger');

//Handles the user sign up route, expects a valid username and password, returns a token and a refresh token
//adds a user to the DB
function signUpHandler(req, res) {
    let {username, password} = req.body;
    User.signUp(username, password)
    .then(()=>{
        var {token, refreshToken} = tokens.generateAccessToken(username);
        res.status(201).json({token, refreshToken})
    })
    .catch((err)=>{
        res.status(401).send(err)
    })
}
//handles login route, same as signUp route
function logInHandler(req, res) {
    let {username, password} = req.body;
    User.signIn(username, password)
    .then(loginStatus=>{
        if(loginStatus){
            var {token, refreshToken} = tokens.generateAccessToken(username);
            res.status(200).json({token, refreshToken})
        } else {
            res.status(401).send("password does not match")
        }
    })
    .catch(err=> {
        console.log(err);
        res.status(400).send("User not Found")
    })

}

//Handles the refresh route, expects a valid refresh token, returns a new JWT if valid
function refreshHandler(req, res) {
    var token = req.body.refreshToken
    var result = tokens.refreshToken(req.body.username, token);
    if (result) {
        res.status(200).send({token: result})
    } else {
        res.status(400).send("token expired")
    }
}
//Handles the logout route, expects a refresh token, removes the included token from the refresh token list
function logoutHandler(req, res) {
    var token = req.body.refreshToken
    tokens.logoutToken(token)
    res.status(200).send("logged out")
}

//Handles the auth route, used for testing purposes to see if a token is valid or not
function authHandler(req, res) {
   var token = req.header('authorization').replace('bearer ', '')
   if(tokens.verifyToken(token)){
       res.status(200).send("valid")
   } else {
       res.status(400).send("invalid")
   }
}

module.exports = {
    signUpHandler,
    logInHandler,
    refreshHandler,
    logoutHandler,
    authHandler
}