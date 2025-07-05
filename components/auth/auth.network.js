const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const responseFunc = require('../../network/responseFunc');

router.post('/login', async (req, res) => {
  try {
    const response = await authController.login(req.body);
    responseFunc.success(req, res, response, response, 201);
  } catch (error) {
    responseFunc.error(req, res, 400, error);
  }
});

module.exports = router;
