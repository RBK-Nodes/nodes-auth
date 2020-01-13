//postgres connector file, just that
const { Pool } = require('pg');

console.log(process.env.DATABASE_URL)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});



module.exports = pool;