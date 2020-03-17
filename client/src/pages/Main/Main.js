import React, { useState, useEffect } from 'react';

// Reminders API
import remindersList from '../../lib/apiService';

// Components
import { Calendar } from '../../components/Calendar/Calendar';

export const Main = () => {
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersList.list().then(({data}) => setReminders(data))
  }, []);

  return (
    <Calendar reminders = { reminders } />
  );
};
