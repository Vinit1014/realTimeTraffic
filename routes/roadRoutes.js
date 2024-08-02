const express = require('express');
const router = express.Router();
const { addRoad } = require('../controllers/roadController');

router.post('/', addRoad);

module.exports = router;
