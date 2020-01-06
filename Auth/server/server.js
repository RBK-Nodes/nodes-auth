const express = require('express')
const app = express();

const User = require('./controller/User');

//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());

app.post('/get', (req, res)=>{
    if(!req.body.username) {
        res.status(402).send("invalid request")
    } else {
        User.find(req.body.username)
        .then(response=>{
            res.status(200).send(response)
        })
    }
})


app.post('/create', (req, res)=>{
    

    
})

app.listen(port);