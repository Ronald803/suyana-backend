const express = require('express');
const router = express.Router();
const specialtyController = require('./specialty.controller');
const { validationJwtRol } = require('../../middlewares/validationJwtRol');
const responseFunc = require('../../network/responseFunc');

router.post('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await specialtyController.postSpecialty(req.body);
    responseFunc.success(req, res, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 500, error);
  }
});
router.get('/', validationJwtRol(), async (req, res) => {
  try {
    const specialties = await specialtyController.getSpecialties(req.body);
    responseFunc.success(req, res, specialties, 200);
  } catch (error) {
    responseFunc.error(req, res, 500, error);
  }
});

module.exports = router;
