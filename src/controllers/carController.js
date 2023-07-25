// controllers/carController.js
const carService = require('../services/carService');

exports.listCars = async (req, res) => {
  try {
    const cars = await carService.getCarsFromExternalAPI();
    res.json(cars);
  } catch (error) {
    console.error('Erro ao obter dados da API externa:', error.message);
    res.status(500).json({ error: 'Erro ao obter dados da API externa' });
  }
};

exports.createCar = async (req, res) => {
  try {
    const carData = req.body;
    const car = await carService.createCarInExternalAPI(carData);

    // Salvar registro na tabela de logs
    await carService.saveLog(car._id);

    // Postar informação do carro criado para a fila
    await carService.postToQueue(car);

    res.json(car);
  } catch (error) {
    console.error('Erro ao criar carro ou enviar para a fila:', error.message);
    res.status(500).json({ error: 'Erro ao criar carro ou enviar para a fila' });
  }
};
