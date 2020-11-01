import express from 'express';
import defaultConfig from '../get-config.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to MARS API v1.0');
});

router.get('/config', (req, res) => res.json(defaultConfig));

export default router;
