// services/logService.js
const Log = require('../models/logModel');

const getAllLogs = async () => {
  return await Log.find();
};

module.exports = {
  getAllLogs,
};
