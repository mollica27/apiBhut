// controllers/logController.js
const logService = require('../services/logService');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await logService.getAllLogs();
    res.json(logs);
  } catch (error) {
    console.error('Erro ao consultar logs:', error.message);
    res.status(500).json({ error: 'Erro ao consultar logs' });
  }
};
