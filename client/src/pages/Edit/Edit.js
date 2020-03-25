import React, { useState, useEffect } from 'react';
import { useInput } from '../../hooks/input-hook';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

// Reminders API
import remindersApi from '../../lib/APIservice';

export const Edit = (props) => {
  const { id } = props.match.params;
  const [reminder, setReminder] = useState();
  const [startDate, setStartDate] = useState(reminder ? reminder.datetime : new Date());

  // Call reminders API
  useEffect(() => {
    remindersApi.details(id).then(({ data }) => setReminder(data));
  }, [id]);
  console.log(reminder);

  const {
    value: description,
    bind: bindDescription
  } = useInput(reminder ? reminder.description : '');
  const {
    value: city,
    bind: bindCity
  } = useInput(reminder ? reminder.city : '');
  const {
    value: color,
    bind: bindColor
  } = useInput(reminder ? reminder.color : '#000000');

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedReminder = {
      id: id,
      description: description,
      city: city,
      color: color,
      datetime: startDate
    };
    console.log(updatedReminder);
    remindersApi.update(updatedReminder).then(window.location.href = '/');
  };

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

Edit.propTypes = {
  match: PropTypes.object.isRequired
};
