const mysql = require('mysql2');

async function createUser(username, password, isCreator) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Livvy2005',
        database: 'new_schema'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    });

    let good = 0;

    const query = `INSERT INTO User (Username, Password, IsCreator) VALUES ('${username}', '${password}', ${isCreator})`;
    try {
        await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('User created successfully');
                    console.log(results);
                    good = 1;
                    resolve();
                }
            });
        });
    } catch (err) {
        // Handle error
    }

    connection.end();

    return good;
}

async function login(username, password) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Livvy2005',
        database: 'new_schema'
    });

    await connection.promise().connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    });

    const query = `SELECT * FROM User WHERE Username = ? AND Password = ?`;
    const [results1] = await connection.promise().query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
        // if no results
        if (results.length === 0) {
            console.log('Login failed');
            return null;
        }
        console.log('Login successful');
    });

    connection.end();

    console.log('results1', results1[0]);

    return results1[0];
}

async function changePassword(username, password) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Livvy2005',
        database: 'new_schema'
    });

    await connection.promise().connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    });

    const query = `UPDATE User SET Password = ? WHERE Username = ?`;
    const [results] = await connection.promise().query(query, [password, username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
        console.log('Password changed successfully');
    });

    connection.end();
    return 1;
}

async function deleteUser(username) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Livvy2005',
        database: 'new_schema'
    });

    await connection.promise().connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    }
    );

    const query = `DELETE FROM User WHERE Username = ?`;
    const [results] = await connection.promise().query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
        console.log('User deleted successfully');
    });

    connection.end();

    return 1;
}




module.exports = { createUser, login, changePassword, deleteUser};