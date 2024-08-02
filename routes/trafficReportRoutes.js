
const express = require('express');
const router = express.Router();
const {
  getRoadTrafficCondition,
  generateTrafficReport,
  analyzeTrafficUpdates,
} = require('../controllers/trafficReportController');

router.get('/roads/:id/traffic-condition', getRoadTrafficCondition);
router.get('/report/traffic', generateTrafficReport);
router.get('/analyze-traffic', analyzeTrafficUpdates);

module.exports = router;
