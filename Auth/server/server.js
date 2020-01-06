const express = require('express')
const app = express();
const User = require('../db/model/User.js')
//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());

app.post('/get', (req, res)=>{
    User.find(req.body.username)
    .then((data)=>{
        console.log(data)
        if(data.rows && data.rows.length>0)   res.status(200).send("found user")
        else    throw Error("aaa")
    })
    .catch(()=>{
        res.status(404).send("user not found")
    })
})


app.post('/create', (req, res)=>{
    

    User.create(req.body)
    .then(()=>{
        console.log("created user")
        res.status(200).send("created user");
    })
    .catch(()=>{
        console.log("duplicate")
        res.status(403).send("duplicate user");

    })
})

app.listen(port);