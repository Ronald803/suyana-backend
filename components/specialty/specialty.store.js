const SpecialtyModel = require('./specialty.model');
async function addSpecialty(specialty) {
  const newSpecialty = new SpecialtyModel(specialty);
  const specialtySaved = await newSpecialty.save();
  return specialtySaved;
}

async function listSpecialties(filter) {
  const specialties = await SpecialtyModel.find(filter);
  return specialties;
}

module.exports = { addSpecialty, listSpecialties };
