const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Test API Endpoints', () => {
  it('Create a new reminder', async done => {
    const validReminder = {
      description: 'This is a sample reminder',
      city: 'Panama City',
      color: '#FF3300',
      datetime: '1989-12-20T06:00:00.000Z'
    };
    const res = await request.post('/api/create').send(validReminder);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
    expect(res.body.description).toBe(validReminder.description);
    expect(res.body.city).toBe(validReminder.city);
    expect(res.body.color).toBe(validReminder.color);
    expect(res.body.datetime).toBe(validReminder.datetime);

    done();
  });

  it('Update an existing reminder', async done => {
    // Create a new reminder
    const validReminder = {
      description: 'This is a sample reminder',
      city: 'Panama City',
      color: '#FF3300',
      datetime: '1989-12-20T06:00:00.000Z'
    };
    const res = await request.post('/api/create').send(validReminder);

    // Capture new reminder's id
    const newReminderId = res.body._id;

    // Update reminder
    const updatedReminder = {
      description: 'This is an updated reminder',
      city: 'Panama City',
      color: '#808080',
      datetime: '1999-12-31T00:00:00.000Z'
    };
    const resUpdate = await request.put(`/api/update/${newReminderId}`).send(updatedReminder);

    // Test
    expect(resUpdate.statusCode).toBe(200);
    expect(resUpdate.body._id).toBe(newReminderId);
    expect(resUpdate.body.description).toBe(updatedReminder.description);
    expect(resUpdate.body.city).toBe(updatedReminder.city);
    expect(resUpdate.body.color).toBe(updatedReminder.color);
    expect(resUpdate.body.datetime).toBe(updatedReminder.datetime);

    done();
  });

  // TODO: Come up with a better test for this
  it('List all reminders', async done => {
    const res = await request.get('/api');

    expect(res.statusCode).toBe(200);

    done();
  });
})
;
