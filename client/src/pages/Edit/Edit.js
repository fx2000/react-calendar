import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

// Reminders API
import remindersApi from '../../lib/APIservice';

export const Edit = (props) => {
  const { id } = props.match.params;
  const [reminder, setReminder] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, errors } = useForm();

  console.log(reminder.color);

  // Call reminders API
  useEffect(() => {
    remindersApi.details(id).then(
      ({ data }) => {
        setReminder(data);
        setStartDate(parseISO(data.datetime));
      }
    );
  }, [id]);

  const onSubmit = data => {
    const updatedReminder = {
      id: id,
      description: data.description,
      city: data.city,
      color: data.color,
      datetime: startDate
    };
    remindersApi.update(updatedReminder).then(window.location.href = '/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="description">Reminder: </label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={reminder.description || ''}
          ref={register({ required: true })}
        />
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={reminder.city || ''}
          ref={register({ required: true })}
        />
        <label htmlFor="color">Color: </label>
        <input
          type="color"
          id="color"
          name="color"
          defaultValue={reminder.color || '#FFCC99'}
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
        {errors.description && <span>This field is required</span>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired
};
