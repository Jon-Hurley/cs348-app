const mysql = require('mysql2');
const config = require('../client/src/config.js');

async function createOrder(productID, userID) {
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

    await connection.promise().beginTransaction();

    const gatherProduct = `SELECT CreatorID, Price FROM Product WHERE ID = ?`;

    const [results] = await connection.promise().query(gatherProduct, [productID], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return null;
        }
    }
    );

    const insertQuery = `INSERT INTO Orders (ProductID, CreatorID, BuyerID, OrderDate, Price) VALUES (?, ?, ?, ?, ?)`;

    try {
        await connection.promise().query(insertQuery, [productID, results[0].creatorID, userID, new Date(), results[0].Price]);
        console.log('Order created successfully');
        success = true;
        await connection.promise().commit();
    }
    catch (error) {
        console.error('Error executing query:', error);
        await connection.promise().rollback();
        return 0;
    }
    finally {
        connection.end();
    }

    return 1;

}

async function getAggregateOrdersByUser(userID) {
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
    });
    try {
        

        console.log('Connected to database');

        await connection.execute('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');
        await connection.promise().beginTransaction();

        // select product name, order quantity, product price, and total price

        const query = `SELECT p.ID, p.Name AS product, o.Price AS price, count(p.ID) AS quantity
        FROM Orders o JOIN Product p ON o.ProductID = p.ID
        WHERE o.BuyerID = ?
        GROUP BY p.ID, o.Price;`

        const [results] = await connection.promise().query(query, [userID]);
        await connection.promise().commit();

        console.log('results in getOrdersByUser:', results);
        
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        await connection.promise().rollback();
        return [];
    } finally {
        connection.end();
    }
}

async function getOrdersByUser(userID) {
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
    });
    try {
        
        console.log('Connected to database');

        await connection.promise().beginTransaction();

        // select product name, product price, and order date
        const query = 'SELECT p.ID, p.Name AS product, o.Price AS price, o.OrderDate AS date \
        FROM Orders o JOIN Product p ON o.ProductID = p.ID \
        WHERE o.BuyerID = ?;'

        const [results] = await connection.promise().query(query, [userID]);

        await connection.promise().commit();

        console.log('results in getOrdersByUser:', results);

        return results;

    } catch (error) {
        console.error('Error executing query:', error);
        await connection.promise().rollback();
        return [];
    } finally {
        connection.end();
    }
}
        


module.exports = { createOrder, getOrdersByUser, getAggregateOrdersByUser };
