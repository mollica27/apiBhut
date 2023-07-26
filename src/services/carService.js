// services/carService.js
const axios = require('axios');
const Car = require('../models/carModel');
const Log = require('../models/logModel');
const carQueue = require('../queues/carQueue');

const getCarsFromExternalAPI = async () => {
  const response = await axios.get('http://api-test.bhut.com.br:3000/api/cars');
  return response.data;
};

const createCarInExternalAPI = async (carData) => {
  const response = await axios.post('http://api-test.bhut.com.br:3000/api/cars', carData);
  return response.data;
};

const saveLog = async (carId) => {
  const log = {
    data_hora: new Date(),
    car_id: carId,
  };
  await Log.create(log);
};

const postToQueue = async (carData) => {
  await carQueue.add(carData);
};

module.exports = {
  getCarsFromExternalAPI,
  createCarInExternalAPI,
  saveLog,
  postToQueue,
};
