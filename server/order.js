const mysql = require('mysql2');

async function createOrder(productID, userID) {
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

    const gatherProduct = `SELECT CreatorID FROM Product WHERE ID = ?`;

    const [results] = await connection.promise().query(gatherProduct, [productID], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
    }
    );

    console.log('Creator ID:', results);
    console.log('User ID:', userID);
    console.log('Product ID:', productID);

    const insertQuery = `INSERT INTO Orders (ProductID, CreatorID, BuyerID, OrderDate) VALUES (?, ?, ?, ?)`;

    try {
        await connection.promise().query(insertQuery, [productID, results[0].creatorID, userID, new Date()]);
        console.log('Order created successfully');
        success = true;
    }
    catch (error) {
        console.error('Error executing query:', error);
        return 0;
    }
    finally {
        connection.end();
    }

    return 1;

}

async function getAggregateOrdersByUser(userID) {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: 'Livvy2005',
            database: 'new_schema'
        });

        console.log('Connected to database');

        // select product name, order quantity, product price, and total price

        const query = 'SELECT p.ID, p.Name AS product, p.Price AS price, count(p.ID) AS quantity \
        FROM Orders o JOIN Product p ON o.ProductID = p.ID \
        WHERE o.BuyerID = ? \
        GROUP BY p.ID;'

        const [results] = await connection.promise().query(query, [userID]);

        connection.end();

        console.log('results in getOrdersByUser:', results);

        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        return [];
    }
}

async function getOrdersByUser(userID) {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: 'Livvy2005',
            database: 'new_schema'
        });

        console.log('Connected to database');

        // select product name, product price, and order date
        const query = 'SELECT p.ID, p.Name AS product, p.Price AS price, o.OrderDate AS date \
        FROM Orders o JOIN Product p ON o.ProductID = p.ID \
        WHERE o.BuyerID = ?;'

        const [results] = await connection.promise().query(query, [userID]);
        
        connection.end();

        console.log('results in getOrdersByUser:', results);

        return results;

    } catch (error) {
        console.error('Error executing query:', error);
        return [];
    }
}
        


module.exports = { createOrder, getOrdersByUser, getAggregateOrdersByUser };
