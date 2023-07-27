// services/carService.js
const axios = require('axios');
const Log = require('../models/logModel');


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


module.exports = {
  getCarsFromExternalAPI,
  createCarInExternalAPI,
  saveLog,
};
