// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const logRoutes = require('./routes/logRoutes');
const carQueue = require('./queues/carQueue');
const axios = require('axios');
const webhookQueue = require('./queues/webhookQueue');
const webhookRoutes = require('./routes/webhookRoutes'); // Adicione essa linha

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
app.use('/api', webhookRoutes); // Adicione essa linha

// Tratamento da fila usando Bull
carQueue.process(async (job) => {
  try {
    const carData = job.data;
    // Supondo que a API externa aceite POST na rota /api/cars
    const response = await axios.post('http://api-test.bhut.com.br:3000/api/cars', carData);

    // Postar o carro criado para a fila de webhooks
    await webhookQueue.add(response.data); // Substitua "webhookQueue" pelo nome da sua fila de webhooks
    console.log('Carro enviado para a fila de webhooks:', response.data);

    // Salvar registro na tabela de logs
    const log = {
      data_hora: new Date(),
      car_id: response.data._id, // ou qualquer outro identificador único que a API externa retorne
    };
    await Log.create(log);

    console.log('Carro criado na API externa e registro de log salvo:', response.data);

  } catch (error) {
    console.error('Erro ao criar carro ou enviar para a fila:', error.message);
    // Trate o erro aqui, você pode reenfileirar a tarefa para tentar novamente ou registrar o erro em um log, por exemplo
  }
});

app.on('Conectado', () => {
  // Iniciar servidor
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}🚀`);
    console.log(`Acessar http://localhost:${port}`);
  });
});
