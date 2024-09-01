const request = require('supertest');
const createApp = require('../app');
const { correctPatients } = require('./fakeData/fakePatients');

describe('Login doctor', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3003);
  })
  let token = ""
  describe('Patient Integration Tests', () => {
    test('Login success', ()=>{
      const loginData = {
        "email": "ana@hotmail.com",
        "password": "123456"
      }
      return request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(201)
      .then(response=>{
        const answer = JSON.parse(response.text);
        token = answer.body.token;
      })
    })
    for (let i = 0; i < correctPatients.length; i++) {
      test('Successful post new Doctor', () => {
        return request(app)
          .post('/api/patient')
          .set('xtoken',token)
          .send(correctPatients[i])
          .expect(201)
      })
    }
  })
})
