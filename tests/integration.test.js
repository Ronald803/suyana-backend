const request = require('supertest');
const createApp = require('../app');

describe('Login doctor', ()=>{
  console.log("login doctor")
  let app = null;
  let server = null;
  beforeAll(()=>{
    app = createApp();
    server = app.listen(3001);
  })
  let token = ""
  describe('Login doctor', ()=>{
    test('Login error', ()=>{
      const loginData = {
        "email": "ana@hotmail.com",
        "password": "1234567"
      }
      return request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(400)
      .then(response=>{
        const answer = JSON.parse(response.text);
        expect(answer.body.error).toEqual("Información incorrecta")
      })
    })
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
    test('Get appointments',()=>{
      return request(app)
      .get('/api/appointment')
      .set('xtoken',token)
      .expect(200)
      .then(response=>{
        const answer = JSON.parse(response.text);
        console.log(answer);
      })
    })
  })
})
