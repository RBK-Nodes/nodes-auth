const { Client, Pool } = require('pg')
require('dotenv').config();
// change the credentials to server's
const connectionString = 'postgressql://admin:admin@localhost:5432/chatAppDB'
//process.env.DATABASE_URL

const client = new Client({
    connectionString: connectionString,
})

module.exports = {
    client,
}