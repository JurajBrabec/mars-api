//const mariadb = require('mariadb');
//const config = require('./mariadb-config.js');

import mariadb from 'mariadb';
import config from './mariadb-config.js';

const pool = mariadb.createPool(config);

export default pool;
