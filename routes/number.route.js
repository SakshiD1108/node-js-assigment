const express = require('express');
const router = express.Router();
const numberController = require('../controllers/number.controller');

router.post('/process-number', numberController.processNumber);
router.get('/display-numbers', numberController.displayNumbers);

module.exports = router;
