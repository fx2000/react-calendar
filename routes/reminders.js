const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// List all reminders
router.get('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// List all reminders in a date range
router.get('/date/:date', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Get reminder
router.get('/:id', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Create reminder
router.post('/create', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Update reminder
router.put('/:id/update', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Delete reminder
router.put('/:id/delete', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Delete reminders per date
router.put('/date/:date/delete', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});
