const { Client, Pool } = require('pg')
// user is admin and password is admin
const connectionString = 'postgressql://postgres:admin@localhost:5433/postgres'
// const pool = new Pool({
//     user: 'admin',
//     password: 'Administrator98',
//     database: 'chatingApp',
//     port: 5432,
// })

const client = new Client({
    connectionString: connectionString,
})
module.exports = {
    client,
    //pool
}