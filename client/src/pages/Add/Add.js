import React, { useState } from 'react';
import { useInput } from '../../hooks/input-hook';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Reminders API
import remindersApi from '../../lib/apiService';

export const Add = () => {
  const [startDate, setStartDate] = useState(new Date());
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
  } = useInput('#99FFFF');  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReminder = {
      description: description,
      city: city,
      color: color,
      datetime: startDate
    }
    console.log(newReminder)
    remindersApi.create(newReminder);
    resetColor('#99FFFF')
    resetDescription('');
    resetCity('');
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
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
