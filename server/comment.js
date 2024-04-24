const mysql = require('mysql2');

async function createComment(userID, productID, rating, description) {

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

    const query = `INSERT INTO Review (ProductID, UserID, Rating, Description) VALUES (?, ?, ?, ?);`;
    
    try {
        await new Promise((resolve, reject) => {
            connection.query(query, [productID, userID, rating, description], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Comment created successfully');
                    console.log(results);
                    resolve();
                }
            });
        }
        );
    }
    catch (err) {
        // Handle error
        return 0;
    }

    connection.end();

    return 1;

}

async function getComments(productID) {

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
    }
    );

    const query = `SELECT u.Username AS user, r.Rating AS rating, r.Description AS comment FROM Review r JOIN User u ON r.UserID = u.ID WHERE ProductID = ?;`;

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [productID], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Comments retrieved successfully');
                    resolve(results);
                }
            });
        }
        );
        connection.end();
        return results;
    }
    catch (err) {
        // Handle error
        return null;
    }

}

module.exports = { createComment, getComments };