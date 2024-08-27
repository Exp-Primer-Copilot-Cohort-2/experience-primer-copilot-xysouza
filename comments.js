// Create web server
// Server listens on port 3000
// Server responds to requests to /comments with an array of comments
// Server responds to requests to /comments/new with a form to submit a new comment
// Server responds to POST requests to /comments/new by adding the submitted comment to the array of comments and redirecting the user to /comments

const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./data/comments');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.get('/comments/new', (req, res) => {
    res.send(`
        <form method="POST" action="/comments/new">
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/comments/new', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.redirect('/comments');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});