import axios from 'axios';

// Reminder API
class reminderService {
  constructor () {
    this.reminder = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL
    });
  }

  // List reminders
  list = () => {
    const response = this.reminder.get('/api/');
    return response;
  }

  // Get specific reminder
  details = id => {
    const response = this.reminder.get(`/api/${id}`);
    return response;
  }

  // List all reminders in a specific date
  listDate = date => {
    const response = this.reminder.get(`/api/date/${date}`);
    return response;
  }

  // Create reminder
  create = reminder => {
    const {
      description,
      city,
      color,
      datetime
    } = reminder;
    const response = this.reminder
      .post('/api/create', {
        description,
        city,
        color,
        datetime
      });
    return response;
  }

  // Update Reminder
  update = reminder => {
    const {
      id,
      description,
      city,
      color,
      datetime
    } = reminder;
    const response = this.reminder
      .put(`/api/update/${id}`, {
        description,
        city,
        color,
        datetime
      });
    return response;
  }

  // Mark reminder as deleted
  delete = id => {
    const response = this.reminder.get(`/api/delete/${id}`);
    return response;
  }

  // Mark all reminders in date as deleted
  deleteDate = date => {
    const response = this.reminder.get(`/api/date/delete/${date}`);
    return response;
  }
}

const axiosRequestFunctions = new reminderService();
export default axiosRequestFunctions;
