import React from 'react';

export const Reminder = (props) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className='daily-reminder'
    >{props.description}</div>
  );
};
