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

async function getProducts(productNameFilter, creatorNameFilter, sortOption, sortOrder) {
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
    let query;
    if (sortOption === 'price') {
        if (sortOrder === 'asc') {
            query = `SELECT p.ID, u.Username, p.Name, p.Description, p.Price FROM Product p JOIN User u ON u.ID = p.CreatorID WHERE p.Name LIKE ? AND u.Username LIKE ? ORDER BY p.Price ASC;`;
        }
        else {
            query = `SELECT p.ID, u.Username, p.Name, p.Description, p.Price FROM Product p JOIN User u ON u.ID = p.CreatorID WHERE p.Name LIKE ? AND u.Username LIKE ? ORDER BY p.Price DESC;`;
        }
    }
    else {
        // create queries for sortOption === 'rating'. Need to grab average rating per product before sorting. It also needs to use a union to get the products with no reviews.
        if (sortOrder === 'asc') {
            query = `SELECT p.ID, u.Username, p.Name, p.Description, p.Price, r.avgRating \
            FROM Product p JOIN User u ON u.ID = p.CreatorID JOIN (SELECT ProductID, AVG(Rating) AS avgRating FROM Review GROUP BY ProductID) r ON p.ID = r.ProductID \
            WHERE p.Name LIKE ? AND u.Username LIKE ? \
            UNION \
            SELECT p.ID, u.Username, p.Name, p.Description, p.Price, 0 AS avgRating \
            FROM Product p JOIN User u ON u.ID = p.CreatorID \
            WHERE p.ID NOT IN (SELECT ProductID FROM Review) AND p.Name LIKE ? AND u.Username LIKE ? \
            ORDER BY avgRating ASC;`;
        }
        else {
            query = `SELECT p.ID, u.Username, p.Name, p.Description, p.Price, r.avgRating \
            FROM Product p JOIN User u ON u.ID = p.CreatorID JOIN (SELECT ProductID, AVG(Rating) AS avgRating FROM Review GROUP BY ProductID) r ON p.ID = r.ProductID \
            WHERE p.Name LIKE ? AND u.Username LIKE ? \
            UNION \
            SELECT p.ID, u.Username, p.Name, p.Description, p.Price, 0 AS avgRating \
            FROM Product p JOIN User u ON u.ID = p.CreatorID \
            WHERE p.ID NOT IN (SELECT ProductID FROM Review) AND p.Name LIKE ? AND u.Username LIKE ? \
            ORDER BY avgRating DESC;`;
        }
    }

    try {
        const results = await new Promise((resolve, reject) => {
            const array_price = [`%${productNameFilter}%`, `%${creatorNameFilter}%`];
            const array_rating = [`%${productNameFilter}%`, `%${creatorNameFilter}%`, `%${productNameFilter}%`, `%${creatorNameFilter}%`];
            let array;
            if (sortOption === 'price') {
                array = array_price;
            }
            else {
                array = array_rating;
            }
            connection.query(query, array , (err, results) => {
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
        console.log('Error in getProducts:', err);
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
    const query = `SELECT u.Username AS creator, u.ID as userID, p.ID, p.Name AS name, p.Description AS description, p.Price AS price FROM User u JOIN Product p ON u.ID = p.CreatorID WHERE p.ID = ?`;

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

async function updateProduct(productID, name, description, price) {
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

    const query = `UPDATE Product SET Name = ?, Description = ?, Price = ? WHERE ID = ?`;

    try {
        await new Promise((resolve, reject) => {
            connection.query(query, [name, description, price, productID], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    console.log('Product updated successfully');
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

module.exports = { publishProduct, getProducts, getProduct, getProductsByCreator, deleteProduct, updateProduct };