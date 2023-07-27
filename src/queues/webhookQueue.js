// queues/webhookQueue.js
const axios = require('axios');
const Queue = require('bull');

// Crie uma instância da fila
const webhookQueue = new Queue('webhookQueue');

webhookQueue.process(async (job) => {
  
  const webhookData = job.data;
  console.log(webhookData);  
  const webhookUrl = 'http://localhost:3000/webhook';

  try {

    await axios.post(webhookUrl, webhookData);

    console.log('Webhook enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o webhook:', error.message);
  }
});

module.exports = webhookQueue;
