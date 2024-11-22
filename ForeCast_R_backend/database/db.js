const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '12345';
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./foreCast_R.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,  (err) => {
    if(err) console.log('An error occurred during the creation of the DB');
    else console.log('DB has been succesfully created');
});

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT DEFAULT user)');

db.get('SELECT * FROM users WHERE username = ?', ['Admin'], (err,row) =>{
    if(err){
        console.error(`Error executing query:`, err);
    }
    if(row){
        console.log('Admin already exists, insertion skipped');
    }
    else{
        db.run(`INSERT INTO users (username, password, role) VALUES (?,?,?)`, ['Admin','111','admin']);
        console.log('Insertion complete');
    }
});


async function registerUser(username, email, password, callback){
    const hashedPW = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?,?)';

    db.run(query, [username, email, hashedPW], (err) => {
        if(err){
            console.log(`There was an error running command: ${query}`);
            return callback(err);
        } 
        else{
            console.log('Database insertion has been successful.');
            return callback(null, {success: true, message: 'User registered'});
        } 
    });
}

async function getUser(username, password, callback){
    const query = 'SELECT username FROM users WHERE username = ?';

    db.run(query, [username], async (err,row) =>{
        if(err) {
            console.log(`Could not fetch user with name: ${username}`);
            return callback(err);
        }
        else if(row && await bcrypt.compare(password, row.password)){
            const token = jwt.sign({id: row.id, username: row.username}, JWT_SECRET, {expiresIn: '5h'});
            callback(null, {success: true, token});
        }
        else callback(null, {success: false, message: 'Invalid username of password'});
    });
}


module.exports = {
    registerUser,
    getUser
}