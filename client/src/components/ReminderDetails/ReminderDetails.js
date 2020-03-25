import React from 'react';
import PropTypes from 'prop-types';

export const ReminderDetails = (props) => {
  const edit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  return (
    <div
      style={{ backgroundColor: props.color }}
      className='daily-reminder'
    >
      <div>{props.description}</div>
      <div>{props.city}</div>
      <button onClick={() => edit(props.id)}>Edit</button>
      <button onClick={() => props.deleteReminder(props.id)}>Delete</button>
    </div>
  );
};

ReminderDetails.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteReminder: PropTypes.func.isRequired
};
