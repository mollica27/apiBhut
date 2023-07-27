// controllers/webhookController.js
exports.receiveWebhook = async (req, res) => {
    try {
      const webhookData = req.body;
  
      console.log('Webhook recebido com sucesso:', webhookData);
  
      // Responder ao webhook com o conteúdo recebido no body
      res.json({ message: 'Webhook recebido com sucesso', data: webhookData });
    } catch (error) {
      console.error('Erro ao processar o webhook:', error.message);
      res.status(500).json({ error: 'Erro ao processar o webhook' });
    }
  };
  