// queues/webhookQueue.js
const axios = require('axios');
const Queue = require('bull');
const webhookQueue = new Queue('webhookQueue');

webhookQueue.process(async (job) => {
  // Obtenha os dados do webhook a partir do job.data
  const webhookData = job.data;

  // Substitua a URL do webhook pelo endpoint do seu servidor ou serviço que receberá o webhook
  const webhookUrl = 'http://localhost:3000/webhook';

  try {
    // Enviar a requisição do webhook
    await axios.post(webhookUrl, webhookData);

    console.log('Webhook enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o webhook:', error.message);
    // Trate o erro aqui, se necessário
  }
});

module.exports = webhookQueue;
