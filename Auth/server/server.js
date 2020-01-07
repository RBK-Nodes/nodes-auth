const express = require('express')
const app = express();

const User = require('./controller/User');

//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());

app.post('/get', (req, res)=>{
    var user = req.body.username;
    if(!user) {
        res.status(402).send("invalid request")
    } else {
        User.find(user)
        .then(response=>{
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(401).send(err)
        })
    }
})


app.post('/create', (req, res)=>{
    var user = req.body.username;
    var pass = req.body.password;
    if(!user || !pass ) {
        res.status(402).send("invalid request")
    } else {
        User.create(user, pass)
        .then(response=>{
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(401).send(err)
        })
    }
})

app.listen(port);