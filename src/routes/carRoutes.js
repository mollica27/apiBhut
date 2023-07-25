// routes/carRoutes.js
const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.get('/listCars', carController.listCars);
router.post('/createCar', carController.createCar);

module.exports = router;
