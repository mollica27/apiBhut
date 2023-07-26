const express = require('express');
const bodyParser = require('body-parser');
const webhookQueue = require('../queues/webhookQueue'); // Importe a fila de webhooks

const router = express.Router();

// Configurar o body-parser para processar o corpo da requisição
router.use(bodyParser.json());

// Rota para receber o webhook na URL http://localhost:3000/webhook
router.post('/webhook', async (req, res) => {
  try {
    // Obtenha os dados do webhook do corpo da requisição
    const webhookData = req.body;

    // Faça o que for necessário com os dados do webhook
    // Por exemplo, você pode salvar os dados no banco de dados, enviar notificações, etc.

    // Postar o webhook para a fila de webhooks
    await webhookQueue.add(webhookData);

    // Responda à requisição com um status 200 para indicar que a requisição foi bem sucedida
    res.status(200).end();
  } catch (error) {
    console.error('Erro ao processar o webhook:', error.message);
    // Trate o erro aqui, se necessário
    res.status(500).json({ error: 'Erro ao processar o webhook' });
  }
});

module.exports = router;
