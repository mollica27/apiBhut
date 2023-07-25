// routes/logRoutes.js
const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.get('/logs', logController.getAllLogs);

module.exports = router;
