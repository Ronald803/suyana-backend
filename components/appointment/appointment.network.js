const express = require('express');
const router = express.Router();
const appointmentController = require('./appointment.controller');
const responseFunc = require('../../network/responseFunc');
const { validationJwtRol } = require('../../middlewares/validationJwtRol');

router.get('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.getAppointments();
    responseFunc.success(req, res, response.length, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 500, error.message);
  }
});
router.post('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.addAppointment(req.body);
    responseFunc.success(req, res, response.length, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 400, error.message);
  }
});

module.exports = router;
