// app.js
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const logRoutes = require('./routes/logRoutes');
const carQueue = require('./queues/carQueue');

const app = express();
app.use(express.json());

// Configuração do MongoDB
const mongoURI = ''; // Substitua pelo URI do seu banco de dados MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso');
})
.catch((error) => {
  console.error('Erro na conexão com o MongoDB:', error.message);
});

// Rotas
app.use('/api', carRoutes);
app.use('/api', logRoutes);

// Tratamento da fila usando Bull
carQueue.process(async (job) => {
  // Defina a lógica do worker aqui, se necessário
  console.log('Carro recebido da fila:', job.data);
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acessar http://localhost:${port}`);
});
