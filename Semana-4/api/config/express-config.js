const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuarioRouter1 = require('../domains/usuarios/controllers/index');
const usuarioRouter2 = require('../domains/musicas/controllers/index');
const usuarioRouter3 = require('../domains/artistas/controllers/index');

app.use('/api/usuarios', usuarioRouter1);
app.use('/api/musicas', usuarioRouter2);
app.use('/api/artistas', usuarioRouter3);

module.exports = app;