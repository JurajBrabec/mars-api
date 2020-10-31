export default {
  host: process.env.NODE_ENV == 'production' ? 'localhost' : 'mars.local',
  port: 3306,
  user: 'operator',
  password: '',
  database: 'mars40',
  connectionLimit: 1,
  multipleStatements: true,
  namedPlaceholders: true,
  queryTimeout: 300000,
  socketTimeout: 300000,
  acquireTimeout: 1000,
};
