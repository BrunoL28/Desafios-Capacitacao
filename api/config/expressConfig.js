const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extendend: true,
}));

module.exports = app;