// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const logRoutes = require('./routes/logRoutes');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuração do MongoDB
mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
    app.emit('Conectado');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error.message);
  });

// Rotas
app.use('/api', carRoutes);
app.use('/api', logRoutes);


app.on('Conectado', () => {
  // Iniciar servidor
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}🚀`);
    console.log(`Acessar http://localhost:${port}`);
  });
});
