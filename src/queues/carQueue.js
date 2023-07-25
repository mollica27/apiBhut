// queues/carQueue.js
const Queue = require('bull');

const carQueue = new Queue('carQueue');

module.exports = carQueue;
