const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '12345';
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./foreCast_R.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,  (err) => {
    if(err) console.log('An error occurred during the creation of the DB');
    else console.log('DB has been succesfully created');
});

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT, role TEXT DEFAULT user)');

async function registerUser(username, email, password){
    const hashedPW = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';

    db.run(query, [username, email, hashedPW], (err) => {
        if(err) console.log(`There was an error running command: ${query}`);
        else console.log('Database insertion has been successful.');
    });
}





module.exports = registerUser();