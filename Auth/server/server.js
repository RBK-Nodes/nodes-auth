const express = require('express')
const bodyParser = require('body-parser')
var app = express();
const { passwordHasher } = require('../encryption/passwordHasher')
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
    const { username, password } = req.body
    //3   hash the password 

    //4   store it in the password
})