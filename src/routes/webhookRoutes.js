// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Rota para receber o webhook
router.post('/', webhookController.receiveWebhook);

module.exports = router;
