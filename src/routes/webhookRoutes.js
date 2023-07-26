// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Rota para receber o webhook na URL http://localhost:3000/webhook
router.post('/webhook', webhookController.receiveWebhook);

module.exports = router;
