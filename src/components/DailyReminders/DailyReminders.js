import React from 'react';

const DailyReminders = (props) => {
  const styles = {
    backgroundColor: props.color
  };
  return (
    <div style={styles} className='daily-reminder'>{props.description}</div>
  );
};

export default DailyReminders;
