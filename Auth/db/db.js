const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query("CREATE table users", (data)=>{
    console.log(data)
})

module.exports = pool;