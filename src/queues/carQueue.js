// queues/carQueue.js
const Queue = require('bull');

// Crie uma instância da fila
const carQueue = new Queue('carQueue');

module.exports = carQueue;
