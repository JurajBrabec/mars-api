import apicache from 'apicache';
import express from 'express';

const router = express.Router();

router.get('/performance', (req, res) => {
  res.json(apicache.getPerformance());
});

router.get('/index', (req, res) => {
  res.json(apicache.getIndex());
});

router.get('/:target?', (req, res) => {
  res.json(apicache.clear(req.params.target));
});

export default router;
