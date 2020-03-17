import React, { useState, useEffect } from 'react';

// Reminders API
import remindersList from '../../lib/apiService';

// Components
import { Titlebar } from '../../components/Titlebar/Titlebar';
import { Calendar } from '../../components/Calendar/Calendar';

export const Main = () => {
  
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersList.list().then(({data}) => setReminders(data))
  }, []);

  return (
    <div>
      <Titlebar />
      <Calendar reminders = { reminders } />
    </div>
  )
}
