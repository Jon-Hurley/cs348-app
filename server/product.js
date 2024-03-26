const mysql = require('mysql2');

async function publishProduct(username, name, description, price, image) {
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

    const query = `INSERT INTO Product (Username, Name, Description, Price, Image) VALUES (?, ?, ?, ?, ?)`;

    try {
        await new Promise((resolve, reject) => {
            connection.query(query, [username, name, description, price, image], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Product published successfully');
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

async function getProducts() {
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

    const query = `SELECT * FROM Product`;

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Products retrieved successfully');
                    console.log(results);
                    resolve(results);
                }
            });
        }
        );
        return results;
    }
    catch (err) {
        // Handle error
        return 0;
    }
}

module.exports = { publishProduct, getProducts };