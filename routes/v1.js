import express from 'express';
import * as v1 from '../controllers/v1.js';

const router = express.Router();

router.get('/customers', v1.customers);
router.get('/reports', v1.reports);
router.get('/towers', v1.towers);
router.get('/:reportName', v1.report);

export default router;
