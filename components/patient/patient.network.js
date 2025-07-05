const express = require('express');
const router = express.Router();
const patientController = require('./patient.controller');
const responseFunc = require('../../network/responseFunc');
const { validationJwtRol } = require('../../middlewares/validationJwtRol');

router.get('/', validationJwtRol(), async (req, res) => {
  try {
    const patients = await patientController.getPatients();
    responseFunc.success(req, res, patients.length, patients, 200);
  } catch (error) {
    responseFunc.error(req, res, 500, e);
  }
});
router.post('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await patientController.addPatient(req.body);
    responseFunc.success(req, res, response, response, 201);
  } catch (error) {
    responseFunc.error(req, res, 400, e);
  }
});

module.exports = router;
