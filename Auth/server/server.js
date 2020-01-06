const express = require('express')
const bodyParser = require('body-parser')
const User = require('../db/model/User.js')
var app = express();
const { passwordHasher, passwordCompare } = require('../encryption/crypto')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());

app.post('/get', (req, res) => {
    User.find(req.body.username)
        .then((data) => {
            console.log(data)
            if (data.rows && data.rows.length > 0) res.status(200).send("found user")
            else throw Error("aaa")
        })
        .catch(() => {
            res.status(404).send("user not found")
        })
})


app.post('/create', (req, res) => {


    User.create(req.body)
        .then(() => {
            console.log("created user")
            res.status(200).send("created user");
        })
        .catch(() => {
            console.log("duplicate")
            res.status(403).send("duplicate user");

        })
})

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
    // mot ?
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
