const express = require('express')
const pool = require('../db/model/model')
var app = express();
console.log(pool)
//changed the port to avoid conflicts
var port = process.env.PORT || 3001
