import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Reminders API
import remindersApi from '../../lib/APIservice';

export const Add = () => {
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    const newReminder = {
      description: data.description,
      city: data.city,
      color: data.color,
      datetime: startDate
    };
    console.log(newReminder);
    remindersApi.create(newReminder).then(window.location.href = '/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="description">Reminder: </label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue=""
          ref={register({ required: true })}
        />
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue=""
          ref={register({ required: true })}
        />
        <label htmlFor="color">Color: </label>
        <input
          type="color"
          id="color"
          name="color"
          defaultValue="#FFCC99"
          ref={register({ required: true })}
        />
        <label htmlFor="datetime">Date & Time: </label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        {errors.description && <span>You must add a description</span>}
        {errors.city && <span>You must add a city</span>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
