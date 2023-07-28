const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Rota para receber o webhook POST na raiz do endpoint /
router.post('/', webhookController.receiveWebhook);

module.exports = router;
