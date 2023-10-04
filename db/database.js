const mysql = require('mysql2')

const conn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'auladb',
    password: '1234',
    port: 3307
})

module.exports = conn.promise()