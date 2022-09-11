const mysql  = require('mysql');
const bluebird = require('bluebird');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myshop'
});

db.query = bluebird.promisify(db.query);
module.exports = db;