const pino = require('pino');

const level = pino({
      name: 'Gunagya',
      level: 'debug',
    });
    
module.exports = level;