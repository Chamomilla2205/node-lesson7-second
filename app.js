const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./router/api.router');
const { DB_URL } = require('./constants');

const app = express();

_connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/node-lesson7', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (err) => {
        console.log(err);
    });
}
