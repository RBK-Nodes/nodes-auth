const express = require('express')
const app = express();
const User = require('../db/model/User.js')
//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());

app.post('/get', (req, res)=>{
    res.status(200).send("get route");
    // User.find(req.body.username)
    // .then(data=>{
    //     res.status(200).send("got data", data)
    // })
    // .catch(err=>{
    //     res.status(200).send("got error ", err)
    // })
})

app.post('/create', (req, res)=>{
    res.status(200).send("create route");

    User.create(req.body)
    .then(()=>{
        console.log("created user")
    })
    .catch(()=>{
        console.log("duplicate")
    })
})

app.listen(port);