const mysql = require('mysql2');


function createSchema() {

    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
    host: 'localhost', // Change this to your database host
    user: 'root', // Change this to your database username
    port: 3306, // Change this to your database port
    password: 'Livvy2005', // Change this to your database password
    database: 'new_schema' // Change this to your database name
    });

    // Connect to the database
    const createTablesQueries = [
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
        );`
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
    createTablesQueries.forEach(query => {
        connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Table created:', query);
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