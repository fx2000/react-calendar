const request = require('supertest');
const app = require('../app.js');

describe('Test API Endpoints', () => {
  it('Create a new reminder', async () => {
    const validReminder = {
      description: 'This is a sample reminder',
      city: 'Panama City',
      color: '#FF3300',
      datetime: '1989-12-20T06:00:000Z'
    }; 
    const res = await request(app)
      .post('/api/create')
      .send(validReminder)
    expect(res.statusCode).toEqual(200)
    expect(res.body._id).toBeDefined();
    expect(res.body.description).toBe(validReminder.description);
    expect(res.body.city).toBe(validReminder.city);
    expect(res.body.color).toBe(validReminder.color);
    expect(res.body.datetime).toBe(validReminder.datetime);
  })
})