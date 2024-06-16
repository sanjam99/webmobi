const db = require('../config/db');

const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

module.exports = { createUser, getUserByEmail, getUserById };
