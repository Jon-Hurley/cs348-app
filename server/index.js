const createSchema = require('./create_schema.js');
const handleUser = require('./user.js');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
// const mysql = require('mysql2');
sha256 = require('js-sha256').sha256;

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     port: 3306,
//     password: 'Livvy2005',
//     database: 'new_schema'
// });
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// })

// // connection.end();
createSchema.createSchema();

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());

app.post('/login', jsonParser, async function (req, res) {
    const { username, password } = req.body;
    const results = await handleUser.login(username, sha256(password));
    console.log('results', results);
    if (results) {
        res.send({message: 'Logged in', username: username, isCreator: results.IsCreator});
    }
    else {
        res.send('Invalid username or password');
    }
});

app.post('/createUser', jsonParser, async function (req, res) {
    const { username, password, isCreator } = req.body;
    results = await handleUser.createUser(username, sha256(password), isCreator);
    console.log(results);
    if (results == 0) {
        res.send({ message: 'Error creating user' });
    }
    else {
        res.send({  message: 'User created' });
    }
    
});

app.post('/changePassword', jsonParser, async function (req, res) {
    const { username, password } = req.body;
    results = await handleUser.changePassword(username, sha256(password));
    console.log(results);
    if (results == 0) {
        res.send({ message: 'Error changing password' });
    }
    else {
        res.send({ message: 'Password changed' });
    }
    
}
);

app.post('/deleteUser', jsonParser, async function (req, res) {
    const { username } = req.body;
    results = await handleUser.deleteUser(username);
    console.log(results);
    if (results == 0) {
        res.send({ message: 'Error deleting user' });
    }
    else {
        res.send({ message: 'User deleted' });
    }
    
}
);

app.post('/publishProduct', jsonParser, async function (req, res) {
    const { username, name, description, price, image } = req.body;
    results = await handleUser.publishProduct(username, name, description, price, image);
    console.log(results);
    if (results == 0) {
        res.send({ message: 'Error publishing product' });
    }
    else {
        res.send({ message: 'Product published' });
    }

});





app.listen(8080, () => console.log('Server running on port 8080'));


// send the name from the request back to the client
// app.post('/', jsonParser, function (req, res) {
//     console.log(req);
//     res.send('Hello ' + req.body.name);
//     });