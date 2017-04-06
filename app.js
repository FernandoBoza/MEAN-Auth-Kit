// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.js');

//Connect to DB
mongoose.connect(config.database);

//Connection is ON
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' +err);
});

// Port and app connection
const app = express();
const port = process.env.PORT || 8080;
const users = require('./routes/users');

//Cors Middlware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
