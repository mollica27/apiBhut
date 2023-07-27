// services/carService.js
const axios = require('axios');
const Log = require('../models/logModel');
const carQueue = require('../queues/carQueue.js');
const webhookQueue = require('../queues/webhookQueue');


const getCarsFromExternalAPI = async () => {
  const response = await axios.get('http://api-test.bhut.com.br:3000/api/cars');
  return response.data;
};

const createCarInExternalAPI = async (carData) => {
  try {
    const response = await axios.post('http://api-test.bhut.com.br:3000/api/cars', carData);
    return response.data;
  } catch (error) {
    
    console.error('Erro ao criar carro:', error.message);
    throw new Error('Erro ao criar carro na API externa');
  }
};


const saveLog = async (carId) => {
  const currentDate = new Date();
  const log = {
    data_hora: currentDate.toLocaleString(),
    car_id: carId,
  };
  await Log.create(log);
};

const postToQueue = async (carData) => {
  // Adicione a tarefa à fila de carros
  await carQueue.add(carData);

  // Adicione a tarefa à fila de webhooks
  await webhookQueue.add(carData);
};

module.exports = {
  getCarsFromExternalAPI,
  createCarInExternalAPI,
  saveLog,
  postToQueue,
};
