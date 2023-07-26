// app.js
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const logRoutes = require('./routes/logRoutes');
const carQueue = require('./queues/carQueue');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuração do MongoDB
const mongoURI = 'mongodb+srv://natanmollica:RlBvO9i1K62LQUXB@cluster0.u10mcvs.mongodb.net/car_logs?retryWrites=true&w=majority'; // Substitua pelo URI do seu banco de dados MongoDB
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
    try {
      const carData = job.data;
      // Supondo que a API externa aceite POST na rota /api/cars
      const response = await axios.post('http://api-test.bhut.com.br:3000/api/cars', carData);
  
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

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acessar http://localhost:${port}`);
});
