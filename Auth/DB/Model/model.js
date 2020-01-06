const { Client, Pool } = require('pg')
// change the credentials to server's
const connectionString = 'postgressql://postgres:admin@localhost:5433/chatAppDB'

const client = new Client({
    connectionString: connectionString,
})

module.exports = {
    client,
}