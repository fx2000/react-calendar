import React, { useState, useEffect } from 'react';
import {
  zonedTimeToUtc
} from 'date-fns-tz';

// Reminders API
import remindersList from '../../lib/apiService';

// Components
import { Schedule } from '../../components/Schedule/Schedule';

export const Date = (props) => {
  const { date } = props.match.params;
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersList.listDate(date).then(({ data }) => setReminders(data))
  }, [date]);
  
  return (
    <div>
      <div>{date}</div>
      <Schedule
        reminders = { reminders }
        date={ zonedTimeToUtc(date, 'America/Panama') }
      />
    </div>
  );
};
