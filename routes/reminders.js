const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { startOfDay, endOfDay, parseISO } = require('date-fns');

// List all reminders
router.get('/', async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ deleted: false });

    res.status(200).json(reminders);
    return;
  } catch (error) {
    next(error);
  }
});

// Create reminder
router.post('/create', async (req, res, next) => {
  const {
    description,
    city,
    color,
    datetime
  } = req.body;

  try {
    const newReminderData = {
      description: description,
      city: city,
      color: color,
      datetime: datetime
    };

    const newReminder = await Reminder.create(newReminderData);
    await newReminder.save();

    res.status(200).json(newReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Delete reminders per date
router.get('/date/delete/:date', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// List all reminders in a specific date
router.get('/date/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const reminders = await Reminder.find({
      datetime: {
        $gte: startOfDay(parseISO(date)),
        $lte: endOfDay(parseISO(date))
      }
    });

    res.status(200).json(reminders);
    return;
  } catch (error) {
    next(error);
  }
});

// Update reminder
router.put('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    description,
    city,
    color,
    datetime
  } = req.body;

  try {
    const updateReminder = await Reminder.findOne({ _id: id });
    Object.assign(updateReminder, {
      description: description,
      city: city,
      color: color,
      datetime: datetime
    });
    await updateReminder.save();

    res.status(200).json(updateReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Delete reminder
router.get('/delete/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteReminder = await Reminder.findOne({ _id: id });
    Object.assign(deleteReminder, { deleted: true });
    await deleteReminder.save();

    res.status(200).json(deleteReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Get reminder
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const reminder = await Reminder.findById(id);
    res.status(200).json(reminder);
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
