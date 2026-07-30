
const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatbotController');

router.post('/query', getChatResponse);

module.exports = router;
    