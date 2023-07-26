// controllers/carController.js
const carService = require('../services/carService');
const Car = require('../models/carModel');

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

    // Criar o carro na API externa
    const car = await carService.createCarInExternalAPI(carData);

    // Salvar o carro no banco de dados local (MongoDB)
    const savedCar = await Car.create({
      title: car.title,
      brand: car.brand,
      price: car.price,
      age: car.age,
    });

    await carService.saveLog(car._id);
    
    console.log('Carro criado com sucesso');
    res.json(savedCar);
  } catch (error) {
    console.error('Erro ao criar carro ou enviar para a fila:', error.message);
    res.status(500).json({ error: 'Erro ao criar carro ou enviar para a fila' });
  }
};
