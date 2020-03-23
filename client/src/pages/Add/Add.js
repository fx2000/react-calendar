import React, { useState, useEffect } from 'react';
import { useInput } from '../../hooks/input-hook';

// Reminders API
import remindersApi from '../../lib/apiService';

export const Add = () => {
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription
  } = useInput('');
  const {
    value: city,
    bind: bindCity,
    reset: resetCity
  } = useInput('');
  const {
    value: color,
    bind: bindColor,
    reset: resetColor
  } = useInput('');
  const {
    value: datetime,
    bind: bindDatetime,
    reset: resetDatetime
  } = useInput('');

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReminder = {
      description: description,
      city: city,
      color: color,
      datetime: new Date()
    }
    await remindersApi.create(newReminder);

    resetDescription();
    resetCity();
    resetColor();
    resetDatetime();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='description'>Reminder: </label>
        <input type='text' id='description' name='description' {...bindDescription}></input>
        <label htmlFor='city'>City: </label>
        <input type='text' id='city' name='city' {...bindCity}></input>
        <label htmlFor='color'>Color: </label>
        <input type='color' id='color' name='color' {...bindColor}></input>
        <label htmlFor='datetime'>Date & Time: </label>
        <input type='text' id='datetime' name='datetime' {...bindDatetime}></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
