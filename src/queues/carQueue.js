// queues/carQueue.js
const Queue = require('bull');
const carQueue = new Queue('carQueue');

carQueue.process(async (job) => {
    const carData = job.data;
  
    console.log('Carro recebido na fila:', carData);
    job.done();
  });

module.exports = carQueue;
