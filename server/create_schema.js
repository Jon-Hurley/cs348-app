const mysql = require('mysql2');


function createSchema() {

    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password,
        database: config.database.database
    });

    // Connect to the database
    const createDesignQueries = [
        `CREATE TABLE IF NOT EXISTS User (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        Username VARCHAR(50),
        Password VARCHAR(100),
        IsCreator BOOLEAN
        );`,
        `CREATE TABLE IF NOT EXISTS Product (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        CreatorID INT,
        Name VARCHAR(50),
        Description TEXT,
        Price DECIMAL(10, 2),
        FOREIGN KEY (CreatorID) REFERENCES User(ID)
        );`,
        `CREATE TABLE IF NOT EXISTS Review (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT,
        UserID INT,
        Rating INT,
        Description TEXT,
        FOREIGN KEY (ProductID) REFERENCES Product(ID),
        FOREIGN KEY (UserID) REFERENCES User(ID)
        );`,
        `CREATE TABLE IF NOT EXISTS Orders (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT,
        CreatorID INT,
        BuyerID INT,
        OrderDate DATE,
        FOREIGN KEY (ProductID) REFERENCES Product(ID),
        FOREIGN KEY (CreatorID) REFERENCES User(ID),
        FOREIGN KEY (BuyerID) REFERENCES User(ID)
        );`,
        `CREATE INDEX IF NOT EXISTS idx_product_name ON Product(Name);`,
        `CREATE INDEX IF NOT EXISTS idx_user_username ON User(Username);`,
        `CREATE INDEX IF NOT EXISTS idx_user_id ON User(ID);`,
        `CREATE INDEX IF NOT EXISTS idx_review_product_id ON Review(ProductID);`,
        `CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON Orders(BuyerID);`,
        `CREATE PROCEDURE IF NOT EXISTS PublishProduct(IN userID INT, IN name VARCHAR(255), IN description TEXT, IN price DECIMAL(10,2)) 
         BEGIN 
             INSERT INTO Product (CreatorID, Name, Description, Price) VALUES (userID, name, description, price); 
         END;`,
        `CREATE PROCEDURE IF NOT EXISTS DeleteProduct(IN productID INT) 
         BEGIN 
             DELETE FROM Product WHERE ID = productID; 
         END;`,
         `CREATE PROCEDURE IF NOT EXISTS createUser(IN username VARCHAR(50), IN password VARCHAR(100), IN isCreator BOOLEAN)
         BEGIN
             INSERT INTO User (Username, Password, IsCreator) VALUES (username, password, isCreator);
         END;`,
         `CREATE PROCEDURE IF NOT EXISTS deleteUser(IN userID INT)
         BEGIN
             DELETE FROM User WHERE ID = userID;
         END;`,



    ];
    connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    });
    
    // SQL statements to create tables
    

    // Execute each create table query
    createDesignQueries.forEach(query => {
        connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Table, index, or stored procedure created:', query);
        });
    });
    

    // Close the connection
    connection.end((err) => {
    if (err) {
        console.error('Error closing connection:', err);
        return;
    }
    console.log('Connection closed');
    });
}

module.exports = { createSchema };