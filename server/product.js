const mysql = require('mysql2');

async function publishProduct(userID, name, description, price) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Livvy2005',
        database: 'new_schema'
    });

    console.log('userID in query:', userID);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return 0;
        }
        console.log('Connected to database');
    });

    const query = `INSERT INTO Product (CreatorID, Name, Description, Price) VALUES (?, ?, ?, ?);`;

    try {
        await new Promise((resolve, reject) => {
            connection.query(query, [userID, name, description, price], (err, results) => {
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

    const query = `SELECT * FROM Product;`;

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

async function getProduct(productID) {
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
    // query to get product by ID and username of creator
    const query = `SELECT u.Username AS creator, p.Name AS name, p.Description AS description, p.Price AS price FROM User u JOIN Product p ON u.ID = p.CreatorID WHERE p.ID = ?`;

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [productID], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Product retrieved successfully');
                    console.log(results);
                    resolve(results);
                }
            });
        }
        );

        console.log('Results in getProduct:', results);

        return results;

    }
    catch (err) {
        // Handle error
        return 0;
    }
}

async function getProductsByCreator(creatorID) {
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

    const query = `SELECT * FROM Product WHERE CreatorID = ?`;
    
    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [creatorID], (err, results) => {
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
        console.log('Results for creator:', results);
        return results;
    }
    catch (err) {
        // Handle error
        return 0;
    }
}

async function deleteProduct(productID) {
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

    const query = `DELETE FROM Product WHERE ID = ?`;

    try {
        await new Promise((resolve, reject) => {
            connection.query(query, [productID], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Product deleted successfully');
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

module.exports = { publishProduct, getProducts, getProduct, getProductsByCreator, deleteProduct };