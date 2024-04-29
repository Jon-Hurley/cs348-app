const mysql = require('mysql2');
const config = require('../client/src/config.js');

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

    await connection.promise().beginTransaction();

    try {
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

        await connection.promise().commit();

        connection.end();

        console.log('results1', results1[0]);

        return results1[0];
    } catch (error) {
        console.error('Error executing query:', error);
        await connection.promise().rollback();

    }

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

async function deleteUser(userID) {
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

    try {

        // delete all foreign key constraints
        const deleteProductReviewsQuery = `DELETE FROM Review WHERE ProductID IN (SELECT ID FROM Product WHERE CreatorID = ?);`;
        await connection.promise().query(deleteProductReviewsQuery, [userID]);

        const deleteProductsQuery = `DELETE FROM Product WHERE CreatorID = ?;`;
        await connection.promise().query(deleteProductsQuery, [userID]);

        const deleteReviewsQuery = `DELETE FROM Review WHERE UserID = ?;`;
        await connection.promise().query(deleteReviewsQuery, [userID]);

        const deleteOrdersQuery = `DELETE FROM Orders WHERE BuyerID = ?;`;
        await connection.promise().query(deleteOrdersQuery, [userID]);

        console.log('userID', userID);

        const deleteUserQuery = `call deleteUser(?);`;
        const [results] = await connection.promise().query(deleteUserQuery, [userID]);
        console.log('results', results);

        console.log('User and related data deleted successfully');
        return 1;
    } catch (error) {
        console.error('Error executing query:', error);
        return 0;
    } finally {
        connection.end();
    }
}




module.exports = { createUser, login, changePassword, deleteUser};