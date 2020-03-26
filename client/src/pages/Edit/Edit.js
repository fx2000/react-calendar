import React, { useState, useEffect } from 'react';
import { useInput } from '../../hooks/input-hook';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

// Reminders API
import remindersApi from '../../lib/APIservice';

export const Edit = (props) => {
  const { id } = props.match.params;
  const [reminder, setReminder] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  // Call reminders API
  useEffect(() => {
    remindersApi.details(id).then(
      ({ data }) => {
        setReminder(data);
        setStartDate(parseISO(data.datetime));
      }
    );
  }, [id]);

  const {
    value: description,
    bind: bindDescription
  } = useInput(reminder.description || '');
  const {
    value: city,
    bind: bindCity
  } = useInput(reminder.city || '');
  const {
    value: color,
    bind: bindColor
  } = useInput(reminder.color || '#000000');

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedReminder = {
      id: id,
      description: description,
      city: city,
      color: color,
      datetime: startDate
    };
    remindersApi.update(updatedReminder).then(window.location.href = '/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='description'>Reminder: </label>
        <input {...bindDescription} type='text' id='description' name='description'></input>
        <label htmlFor='city'>City: </label>
        <input {...bindCity} type='text' id='city' name='city'></input>
        <label htmlFor='color'>Color: </label>
        <input {...bindColor} type='color' id='color' name='color'></input>
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

Edit.propTypes = {
  match: PropTypes.object.isRequired
};
