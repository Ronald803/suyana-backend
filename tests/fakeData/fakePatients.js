const { specialties } = require("./fakeSpecialties")

const correctPatients = [
  {
    "name": "Jhon Lenon",
    "age": 14,
    "birthday": "2010-05-07",
    "phone": 456789,
    "branch": "El Alto",
    "specialty": [specialties[0].value, specialties[1].value],
    "diagnosis": "Sin diagnostico (pendiente)"
  },
  {
    "name": "Paul Mcarney",
    "age": 9,
    "birthday": "2015-05-07",
    "phone": 7459521,
    "branch": "El Alto",
    "specialty": [specialties[1].value, specialties[2].value],
    "diagnosis": "Sin diagnostico (pendiente)"
  },
  {
    "name": "Ringo Star",
    "age": 10,
    "birthday": "2014-05-07",
    "phone": 87566513,
    "branch": "El Alto",
    "specialty": [specialties[2].value, specialties[0].value],
    "diagnosis": "Sin diagnostico (pendiente)"
  },
  {
    "name": "George Harrison",
    "age": 6,
    "birthday": "2018-05-07",
    "phone": 613213599,
    "branch": "El Alto",
    "specialty": [specialties[3].value, specialties[2].value],
    "diagnosis": "Sin diagnostico (pendiente)"
  }
]

module.exports = { correctPatients }
