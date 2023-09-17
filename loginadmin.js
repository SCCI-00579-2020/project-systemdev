const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse incoming JSON data
app.use(bodyParser.json());

// Database configuration
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'your_username', // 
    password: 'your_password', 
    database: 'your_database' 
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected');
    }
});

// Create a route to handle login data storage
app.post('/store-login', (req, res) => {
    const { username, password } = req.body;

    // Insert login data into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
