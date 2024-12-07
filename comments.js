// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load comments from file
let comments = [];
fs.readFile('comments.json', 'utf8', (err, data) => {
    if (!err) {
        comments = JSON.parse(data);
    }
});

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = Date.now();
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (!err) {
            res.status(201).json(comment);
        } else {
            res.status(500).json({ error: 'Failed to save comment' });
        }
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});