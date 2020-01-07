const express = require('express')

const bodyParser = require('body-parser')
const User = require('./controller/User.js/index.js')
var app = express();
const { passwordHasher, passwordCompare } = require('../encryption/crypto')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./controller/User');


//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());
var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
})


//abstract signUp
var userFinder = (req, res, callback) => {
    const { username } = req.body
    User.find(username)
        .then((data) => {
            console.log(data)
            if (data.rows && data.rows.length > 0) {
                callback(null, data.rows)
            }
            else callback(Error("aaa"), null)
        })
        .catch(() => {
            res.status(404).send("user not found")
        })
}
app.post('/get', (req, res) => {
    //need to work more on this condition
    userFinder(req, res, (err, result) => {
        if (err) res.sendStatus(300)
        res.sendStatus(200).json(result)
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


//adding routes here (post requsets)
app.post('/signup', (req, res) => {
    //1   take username
    //2   password

    // check if the user aleady signed up
    let { username, password } = req.body
    userFinder(req, res, (err, result) => {
        if (err) res.sendStatus(300)
        if (result) {
            //redirect to login
            res.redirect('/login')
        }
    })

    //3   hash the password 
    passwordHasher(password, (err, hash) => {
        if (err) return;
        var hashedPass = hash
    })
    //4   store user and  password in the DB
    User.create({ username: username, password: hashedPass })
        .then(result => {
            if (result) {
                // stord successfly? 
                // redirect to login
                res.redirect('/login')
            }
        })
        .catch(err => {
            // else ? 
            //send 403 resonse
            if (err) {
                res.sendStatus(403)
            }
        })
})

app.post('/login', (req, res) => {
    //check if the user has a valid token
    // mot ?
    let { username, password } = req.body
    //check if user exists in DB?
    userFinder(req, res, (err, result) => {
        if (err) res.sendStatus(401)
        if (result) {
            //get his hashedPass
            var hash = result.password
        }
    })
    //compare it with the hashing function
    passwordCompare(password, hash, (err, match) => {
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

