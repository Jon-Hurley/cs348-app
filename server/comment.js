const mysql = require('mysql2');
const config = require('../client/src/config.js');

async function createComment(userID, productID, rating, description) {

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
    console.log('productID in query:', productID);

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

    const commentsQuery = `SELECT u.Username AS user, r.Rating AS rating, r.Description AS comment FROM Review r JOIN User u ON r.UserID = u.ID WHERE ProductID = ?;`;
    const averageQuery = `SELECT AVG(Rating) AS averageRating FROM Review WHERE ProductID = ?;`;

    try {
        const commentsPromise = new Promise((resolve, reject) => {
            connection.query(commentsQuery, [productID], (err, results) => {
                if (err) {
                    console.error('Error executing comments query:', err);
                    reject(err);
                } else {
                    console.log('Comments retrieved successfully');
                    resolve(results);
                }
            });
        });

        const averagePromise = new Promise((resolve, reject) => {
            connection.query(averageQuery, [productID], (err, results) => {
                if (err) {
                    console.error('Error executing average query:', err);
                    reject(err);
                } else {
                    console.log('Average rating retrieved successfully');
                    resolve(results[0].averageRating);
                }
            });
        });

        const [comments, averageRating] = await Promise.all([commentsPromise, averagePromise]);
        
        connection.end();
        
        return { comments, averageRating };
    } catch (err) {
        // Handle error
        console.error('Error in getCommentsWithAverage:', err);
        return null;
    }
}


module.exports = { createComment, getComments };