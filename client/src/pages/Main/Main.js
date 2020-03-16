import React, { useState, useEffect } from 'react';

// Reminders API
import remindersList from '../../lib/reminder-service';

// Components
import { Titlebar } from '../../components/Titlebar/Titlebar';
import { Calendar } from '../../components/Calendar/Calendar';

export const Main = () => {
  
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersList.list().then(
      ({data}) => {
        if (data.length > 0) {
          setReminders(data);
        }
      }
    ).catch(error => console.log(error))
  }, []);
  console.log(reminders)

  return (
    <div>
      <Titlebar />
      <Calendar reminders = { reminders } />
    </div>
  )
}
