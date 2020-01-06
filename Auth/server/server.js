const express = require('express')
const bodyParser = require('body-parser')
var app = express();
const { passwordHasher, passwordCompare } = require('../encryption/crypto')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//changed the port to avoid conflicts
var port = process.env.PORT || 3001

var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
})

//adding routes here (post requsets)
app.post('/signup', (req, res) => {
    //1   take username
    //2   password
    let { username, password } = req.body
    //3   hash the password 
    passwordHasher(password, (err, hash) => {
        if (err) return;
        const hashedPass = hash
    });
    //4   store user and  password in the DB
    // stord successfly? 
    // redirect to login
    res.redirect('/login')
    // else ? 
    //send 403 resonse
    res.sendStatus(403)
})

app.post('/login', (req, res) => {

    //check if the user has a valid token
    let { username, password } = req.body
    //check if user exists in DB?
    //get his hashedPass
    //compare it with the hashing function
    passwordCompare(password
        // ,hashed password here
        , (err, match) => {
            // matched?
            if (match) {
                // generate new Token
                // store it in DB
                //send the token back to the user
                //redirect to main page
            } else {
                //else ?
                //send message telling PW not correct

            }
        }
    )
})
