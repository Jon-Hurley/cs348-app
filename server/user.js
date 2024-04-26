const mysql = require('mysql2');

async function createUser(username, password, isCreator) {
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    });

    let success = false;

    // Check if the username already exists
    const checkQuery = `SELECT COUNT(*) AS count FROM User WHERE Username = ?`;
    const [rows] = await connection.promise().query(checkQuery, [username]);

    if (rows[0].count > 0) {
        console.log('Username already exists');
        connection.end();
        return null;
    }

    // If username doesn't exist, proceed with user creation
    // const insertQuery = `INSERT INTO User (Username, Password, IsCreator) VALUES (?, ?, ?)`;

    const insertQuery = `CALL createUser(?, ?, ?)`;
    try {
        await connection.promise().query(insertQuery, [username, password, isCreator]);
        console.log('User created successfully');
        success = true;
        const query = `SELECT * FROM User WHERE Username = ?`;
        const [results] = await connection.promise().query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
    });

    console.log('results', results[0]);
    connection.end();
    return results[0];
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        connection.end();
    }
}


async function login(username, password) {
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
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
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
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
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
    });

    await connection.promise().connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    }
    );

    // const query = `DELETE FROM User WHERE Username = ?`;

    const query = `CALL deleteUser(?)`;
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