import apicache from 'apicache';
import express from 'express';
import bodyParser from 'body-parser';
import defaultRoutes from './routes/default.js';
import cacheRoutes from './routes/cache.js';
import v1Routes from './routes/v1.js';

const app = express();
const cache = apicache.middleware;
//app.use(cache('5 minutes'));
app.use(bodyParser.json());
app.use('/api', defaultRoutes);
app.use('/api/cache', cacheRoutes);
app.use('/api/v1', v1Routes);
app.get('/', (req, res) => {
  res.redirect('/api');
});
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`MARS API running at http://localhost:${port}`)
);
