const express = require('express');
const bodyParser = require('body-parser');
const db = require('./mariadb');

const app = express();
app.use(bodyParser.json());
const port = 3000;

const defaultConfig = require('./get-config');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api', (req, res) => res.json(defaultConfig));

app.get('/v1/customers', async (req, res) => {
  let response;
  if (db) {
    const sql = `select name from config_customers where obsoleted is null;`;
    try {
      response = await db.query(sql);
    } catch (error) {
      response = { error };
    }
  } else {
    response = { error: 'Not connected' };
  }
  res.json(response);
});

app.get('/v1/reports', async (req, res) => {
  let response = {};
  if (db) {
    const sql = `select name,title,description from core_sources where obsoleted is null;`;
    try {
      response = await db.query(sql);
    } catch (error) {
      response = { error };
    }
  } else {
    response = { error: 'Not connected' };
  }
  res.json(response);
});

app.get('/v1/towers', async (req, res) => {
  let response = {};
  if (db) {
    const sql = `select name from config_towers where obsoleted is null;`;
    try {
      response = await db.query(sql);
    } catch (error) {
      response = { error };
    }
  } else {
    response = { error: 'Not connected' };
  }
  res.json(response);
});

app.get('/v1/r/:report', async (req, res) => {
  let response = {};
  if (db) {
    let sql = '';
    const { tower, customer, timePeriod } = req.query;
    const { report } = req.params;
    if (tower) sql += `set @tower='${tower}';`;
    if (customer) sql += `set @customer='${customer}';`;
    if (timePeriod) sql + `set @datetime_from='${timePeriod}';`;
    sql += `select * from ${report};`;
    try {
      response = await db.query(sql);
    } catch (error) {
      response = { error };
    }
  } else {
    response = { error: 'Not connected' };
  }
  res.json(response);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
