const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query("CREATE DATABASE nodechat", (data)=>{
    console.log(data)
})

module.exports = pool;