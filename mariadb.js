const mariadb = require('mariadb');
const config = require('./mariadb-config.js');

const pool = mariadb.createPool(config);

module.exports = pool;
