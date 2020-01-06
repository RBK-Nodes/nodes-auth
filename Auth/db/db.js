const { Pool } = require('pg');

console.log(process.env.DATABASE_URL)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query("CREATE table users", (data)=>{
    console.log(data)
})

module.exports = pool;