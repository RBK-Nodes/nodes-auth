const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const User = require('./controller/User');


//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());
var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
})


app.post('/signup', (req, res)=>{
    let {username, password} = req.body;
    User.signUp(username, password)
    .then((aaa)=>{
        res.status(201).send({aaa})
    })
    .catch((err)=>{
        res.status(401).send(err)
    })
})

app.post('/signin', (req, res)=>{
    let {username, password} = req.body;
    User.signIn(username, password)
    .then(loginStatus=>{
        if(loginStatus){
            res.status(200).send("logged in");
        } else {
            res.status(401).send("password does not match")
        }
    })
    .catch(err=> {
        res.status(400).send("User not Found")
    })

})