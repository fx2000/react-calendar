const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);
const { parseJSON, parseISO } = require('date-fns')

describe('Test API Endpoints', () => {
  it('Create a new reminder', async done => {
    const validReminder = {
      description: 'This is a sample reminder',
      city: 'Panama City',
      color: '#FF3300',
      datetime: '1989-12-20T06:00:00.000Z'
    };
    const res = await request.post('/api/create').send(validReminder)

    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBeDefined();
    expect(res.body.description).toBe(validReminder.description);
    expect(res.body.city).toBe(validReminder.city);
    expect(res.body.color).toBe(validReminder.color);
    expect(res.body.datetime).toBe(validReminder.datetime);

    done();
  });

  it('List all reminders', async done => {
    const res = await request.get('/api');

    expect(res.statusCode).toBe(200);

    done();
  });
})