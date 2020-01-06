const Pool = require('pg').Pool

var pool = new Pool({
    user: 'admin',
    password: 'admin',
    database: 'chatterApp'
})
module.exports = { pool }