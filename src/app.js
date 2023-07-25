const express = require('express');
const routes = require('./routes');
const path = require('path');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const { Queue, Worker } = require('bull');

const app = express();
app.use(express.json());


app.use(routes);

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});