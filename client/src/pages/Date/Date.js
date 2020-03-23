import React, { useState, useEffect } from 'react';
import { format, zonedTimeToUtc } from 'date-fns-tz';

// Reminders API
import remindersApi from '../../lib/apiService';

// Components
import { Schedule } from '../../components/Schedule/Schedule';

export const Date = (props) => {
  const { date } = props.match.params;
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersApi.listDate(date).then(({ data }) => setReminders(data))
  }, [date]);
  
  return (
    <div className='date-schedule'>
      <div>{format(zonedTimeToUtc(date, 'America/Panama'), 'EEEE MMMM do, yyyy')}</div>
      <Schedule
        reminders = { reminders }
        date={ zonedTimeToUtc(date, 'America/Panama') }
      />
    </div>
  );
};
