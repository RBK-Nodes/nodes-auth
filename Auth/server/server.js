const express = require('express')
const { pool, client } = require('../db/model/model')
var app = express();
//changed the port to avoid conflicts
var port = process.env.PORT || 3001
//importing client
client.connect(
    (err, client, done) => {
        if (err) throw err
        var server = app.listen(port, () => {
            console.log(`listenting on port ${port}`)
        })
    }
)
