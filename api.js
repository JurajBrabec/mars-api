import apicache from 'apicache';
import express from 'express';
import bodyParser from 'body-parser';
import db from './mariadb.js';
import htmlTable from './table.js';
import defaultConfig from './get-config.js';

const app = express();
const cache = apicache.middleware;
//app.use(cache('5 minutes'));
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.get('/api', (req, res) => {
  res.send('Welcome to MARS API v1.0');
});

app.get('/api/cache/performance', (req, res) => {
  res.json(apicache.getPerformance());
});

app.get('/api/cache/index', (req, res) => {
  res.json(apicache.getIndex());
});

app.get('/api/cache/clear/:target?', (req, res) => {
  res.json(apicache.clear(req.params.target));
});

app.get('/api/v1/config', (req, res) => res.json(defaultConfig));

app.get('/api/v1/customers', async (req, res) => {
  try {
    const sql = `select name from config_customers where obsoleted is null order by name;`;
    res.json(await db.query(sql));
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/api/v1/reports', async (req, res) => {
  try {
    const sql = `select name,title,description from core_sources where obsoleted is null order by name;`;
    res.json(await db.query(sql));
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/api/v1/towers', async (req, res) => {
  const sql = `select name from config_towers where obsoleted is null order by name;`;
  try {
    res.json(await db.query(sql));
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/api/v1/html/:report', async (req, res) => {
  const { tower, customer, timePeriod } = req.query;
  const { report } = req.params;
  try {
    let sql = '';
    sql = `select report,ord,name,title,description,fields,link,pivot,tower,customer,timeperiod,\`limit\` from core_sources where name='${report}' and obsoleted is null order by report,ord;`;
    const sources = await db.query(sql);
    if (sources.length == 0)
      return res.status(404).json({ error: `Invalid report name '${report}'` });
    const source = sources[0];
    sql = `select name,title,type,link,description from core_fields where source='${source.name}' and obsoleted is null order by ord;`;
    const fields = await db.query(sql);
    sql = `select field,ord,operator,value,style,description,fields from core_formats where '${source.name}' regexp source and obsoleted is null order by field,ord;`;
    const formats = await db.query(sql);
    sql = `select field,target,ord,filter,operator,value from core_links where '${source.name}' regexp source and obsoleted is null order by field,target,ord;`;
    const links = await db.query(sql);
    sql = `select * from ${source.name};`;
    if (tower) sql = `set @tower='${tower}';${sql}`;
    if (customer) sql = `set @customer='${customer}';${sql}`;
    if (timePeriod) sql = `set @datetime_from='${timePeriod}';${sql}`;
    const data = await db.query(sql);
    res.send(htmlTable(source.name, fields, formats, links, data));
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

app.listen(port, () =>
  console.log(`MARS API running at http://localhost:${port}`)
);
