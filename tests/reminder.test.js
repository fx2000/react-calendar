const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);

// TODO: Set up and seed a test database to improve API endpoint testing
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

  // TODO: Come up with a better test for this
  it('List all reminders', async done => {
    const res = await request.get('/api');

    expect(res.statusCode).toBe(200);

    done();
  });

  it('Get a specific reminder', async done => {
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

    //  Get reminder information
    const resUpdate = await request.get(`/api/${newReminderId}`);

    expect(resUpdate.statusCode).toBe(200);
    expect(resUpdate.body._id).toBe(newReminderId);
    expect(resUpdate.body.description).toBe(validReminder.description);
    expect(resUpdate.body.city).toBe(validReminder.city);
    expect(resUpdate.body.color).toBe(validReminder.color);
    expect(resUpdate.body.datetime).toBe(validReminder.datetime);
    expect(resUpdate.body.deleted).toBe(false);

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

    expect(resUpdate.statusCode).toBe(200);
    expect(resUpdate.body._id).toBe(newReminderId);
    expect(resUpdate.body.description).toBe(updatedReminder.description);
    expect(resUpdate.body.city).toBe(updatedReminder.city);
    expect(resUpdate.body.color).toBe(updatedReminder.color);
    expect(resUpdate.body.datetime).toBe(updatedReminder.datetime);

    done();
  });

  it('Mark an existing reminder as deleted', async done => {
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

    // Mark reminder as deleted
    const resDeleted = await request.get(`/api/delete/${newReminderId}`);

    expect(resDeleted.statusCode).toBe(200);
    expect(resDeleted.body._id).toBe(newReminderId);
    expect(resDeleted.body.deleted).toBe(true);

    done();
  });

  it('Mark all reminders in a specific date as deleted', async done => {
    done();
  });

  // TODO: Come up with a better test for this
  it('List all reminders in a specific date', async done => {
    const date = '1989-12-20';
    const res = await request.get(`/api/date/${date}`);

    expect(res.statusCode).toBe(200);
    done();
  });
})
;
