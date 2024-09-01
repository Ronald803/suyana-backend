const request = require('supertest');
const createApp = require('../app');
const { correctDoctorArray, incorrectDoctorArray } = require('./fakeData/fakeDoctors.js');

describe('Login doctor', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3002);
  })
  describe('Doctor Integration Tests', () => {
    for (let i = 0; i < incorrectDoctorArray.length; i++) {
      test('Bad request post new Doctor', () => {
        return request(app)
          .post('/api/staff')
          .send(incorrectDoctorArray[i])
          .expect(400)
      })
    }
    for (let i = 0; i < correctDoctorArray.length; i++) {
      test('Successful post new Doctor', () => {
        return request(app)
          .post('/api/staff')
          .send(correctDoctorArray[i])
          .expect(201)
      })
    }
  })
})
