const { Pool } = require('pg');

console.log(process.env.DATABASE_URL)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query(`CREATE TABLE users (
    id serial primary key,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

)`, (err, data)=>{
    if(err) console.error(err);
    
    console.log(data)
})

module.exports = pool;