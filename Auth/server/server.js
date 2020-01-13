const express = require('express')
//load the database connection URI and the JWT secret token
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors');
var app = express();

//include the required middleware for CORS and JSON parsing
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import the route handler functions
const { signUpHandler, logInHandler, refreshHandler, logoutHandler, authHandler } = require('./requestHandler');


var port = process.env.PORT || 3001
app.use(express.json());
var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
})


app.post('/signup', signUpHandler);

app.post('/signin', logInHandler);

app.post('/refresh', refreshHandler);

app.post('/logout', logoutHandler);

app.post('/auth', authHandler);