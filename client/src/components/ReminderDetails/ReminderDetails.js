import React from 'react';

export const ReminderDetails = (props) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className='daily-reminder'
    >{props.description}</div>
  );
};
