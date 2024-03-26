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
        Username VARCHAR(50) PRIMARY KEY,
        Password VARCHAR(100),
        IsCreator BOOLEAN
        );`,
        `CREATE TABLE IF NOT EXISTS Product (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        CreatorUsername VARCHAR(50),
        Description TEXT,
        Price DECIMAL(10, 2),
        Image VARCHAR(100),
        FOREIGN KEY (CreatorUsername) REFERENCES User(Username)
        );`,
        `CREATE TABLE IF NOT EXISTS Review (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT,
        Username VARCHAR(50),
        Rating INT,
        Description TEXT,
        FOREIGN KEY (ProductID) REFERENCES Product(ID),
        FOREIGN KEY (Username) REFERENCES User(Username)
        );`,
        `CREATE TABLE IF NOT EXISTS Orders (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT,
        CreatorUsername VARCHAR(50),
        OrderDate DATE,
        TrackingNumber VARCHAR(50),
        FOREIGN KEY (ProductID) REFERENCES Product(ID),
        FOREIGN KEY (CreatorUsername) REFERENCES User(Username)
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