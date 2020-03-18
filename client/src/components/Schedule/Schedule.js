import React, { useState, useEffect } from 'react';
import {
  compareAsc,
  parseISO,
  parse,
  isSameHour,
  format
} from 'date-fns';

// Components
import { Reminder } from '../../components/Reminder/Reminder';

export const Schedule = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props)
  }, [props]);

  const fullDay = [];
  let hour = ''
  let dailyReminders = [];

  for (let i = 0; i <= 24; i++) {
    // Check if reminders have loaded from props, filter and sort
    if (nameState.reminders) {
      dailyReminders = nameState.reminders
        .sort((a, b) => compareAsc(parseISO(a.datetime), parseISO(b.datetime)))
        .filter(reminder => isSameHour(parse(i, 'H', parseISO(props.date)), parseISO(reminder.datetime))
        );
    }
    hour = format(parse(i, 'H', parseISO(props.date)), 'MMMMMM yyyy');
    fullDay.push(
      <div key={i}>
        <div>{hour}</div>
        <div>
          { // Get reminders for a specific hour
            (nameState.reminders) ? dailyReminders
              .sort((a, b) => compareAsc(parseISO(a.datetime), parseISO(b.datetime)))
              .map((reminder, index) =>
                <Reminder
                  key={index}
                  id={reminder._id}
                  description={reminder.description}
                  color={reminder.color}
                  datetime={reminder.datetime}
                  city={reminder.city}
                />
              ) : null
          }
        </div>
      </div>
    );
  }

  return (
    <div>{fullDay}</div>
  )
}
