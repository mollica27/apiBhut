// models/carModel.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
