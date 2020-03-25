import React from 'react';
import PropTypes from 'prop-types';

export const Reminder = (props) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className="daily-reminder"
    >{props.description}</div>
  );
};

Reminder.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
