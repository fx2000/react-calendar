import React, { useState, useEffect } from 'react';

// Reminders API
import remindersApi from '../../lib/APIservice';

// Components
import { Calendar } from '../../components/Calendar/Calendar';

export const Main = () => {
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersApi.list().then(({ data }) => setReminders(data));
  }, []);

  return (
    <Calendar reminders = { reminders } />
  );
};
