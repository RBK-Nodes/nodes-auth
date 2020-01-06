var conn = require('../db');

//User Schema
const userSchema = `CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
    );`

conn.query(userSchema, (err, data)=>{
    if(err) console.error(err);
    else    console.log("Created User Table")
})

//User functionality

