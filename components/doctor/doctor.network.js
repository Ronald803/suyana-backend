const express = require('express');
const router = express.Router();
const doctorController = require('./doctor.controller');
const responseFunc = require('../../network/responseFunc');
const { validationJwtRol } = require('../../middlewares/validationJwtRol');

router.get('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await doctorController.getDoctors();
    responseFunc.success(req, res, response, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 500, error);
  }
});
router.post('/', async (req, res) => {
  try {
    const response = await doctorController.addDoctor(req.body);
    responseFunc.success(req, res, response, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 400, e);
  }
});

module.exports = router;
