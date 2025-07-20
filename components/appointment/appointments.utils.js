const shapeSchedule = (appointments) => {
  const schedule = {
    '08:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '08:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '09:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '09:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '10:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '10:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '11:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '11:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '12:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '12:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '13:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '13:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '14:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '14:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '15:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '15:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '16:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '16:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '17:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '17:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '18:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '18:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '19:00': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
    '19:30': {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
  };
  appointments.forEach((appointment) => {
    const specialtyId = appointment.doctor.specialty.id;
    const specialtyName = appointment.doctor.specialty.name;
    const day = appointment.day;
    const startHour = appointment.startHour;
    const duration = appointment.duration;
    const patientId = appointment.patient._id;
    const patientName = appointment.patient.name;
    const doctorId = appointment.doctor._id;
    const doctorName = appointment.doctor.name;
    const appointmentId = appointment._id;
    const startEndHour = generateStartEndHours(startHour);
    schedule[startHour][day][specialtyId] = {
      specialtyName,
      patientId,
      patientName,
      doctorId,
      doctorName,
      appointmentId,
      startEndHour,
    };
    if (duration === 1) {
      const newStartHour = addOneHourDuration(startHour);
      schedule[newStartHour][day][specialtyId] = {
        specialtyName,
        patientId,
        patientName,
        doctorId,
        doctorName,
        appointmentId,
        startEndHour,
      };
    }
  });
  return schedule;
};

const addOneHourDuration = (startHour) => {
  const hour = startHour.split(':');
  let newStartHour;
  if (hour[1] === '00') {
    newStartHour = hour[0] + ':30';
  } else if (hour[1] === '30') {
    newStartHour = parseInt(hour[0]) + 1 + ':00';
  }
  return newStartHour.length === 4 ? '0' + newStartHour : newStartHour;
};

const generateStartEndHours = (startHour) => {
  const hour = startHour.split(':');
  let endHour = parseInt(hour[0]) + 1;
  return (
    startHour +
    ' - ' +
    (endHour.length === 4 ? '0' + endHour : endHour) +
    ':' +
    hour[1]
  );
};

module.exports = { shapeSchedule };
