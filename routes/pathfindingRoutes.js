const express = require('express');
const router = express.Router();
const { getShortestPath } = require('../controllers/pathFindingController');

router.get('/', getShortestPath);

module.exports = router;
