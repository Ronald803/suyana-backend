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
    responseFunc.error(req, res, 500, error);
  }
});
router.post('/', validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.addAppointment(req.body);
    responseFunc.success(req, res, response.length, response, 200);
  } catch (error) {
    responseFunc.error(req, res, 400, e);
  }
});
// router.put('/:id', validationJwtRol(), (req, res) => {
//   controller
//     .updateAppointment(req.params.id, req.body)
//     .then((updatedAppointment) => {
//       responseFunc.success(
//         req,
//         res,
//         'Cita médica actualizada correctamente',
//         updatedAppointment,
//         200,
//       );
//     })
//     .catch((e) => {
//       responseFunc.error(req, res, 500, e);
//     });
// });
// router.delete('/:id', validationJwtRol(), (req, res) => {
//   controller
//     .deleteAppointment(req.params.id)
//     .then((deletedAppointment) => {
//       responseFunc.success(
//         req,
//         res,
//         'Cita médica eliminada correctamente',
//         deletedAppointment,
//         200,
//       );
//     })
//     .catch((e) => {
//       responseFunc.error(req, res, 500, e);
//     });
// });

module.exports = router;
