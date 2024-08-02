const express = require('express');
const router = express.Router();
const { updateTrafficCondition } = require('../controllers/trafficUpdateController');

router.post('/', updateTrafficCondition);

module.exports = router;



