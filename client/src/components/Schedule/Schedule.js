import React, { useState, useEffect } from 'react';
import {
  compareAsc,
  parse,
  isSameHour,
} from 'date-fns';
import {
  format,
  utcToZonedTime
} from 'date-fns-tz';

// Components
import { ReminderDetails } from '../../components/ReminderDetails/ReminderDetails';

export const Schedule = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props)
  }, [props]);

  const fullDay = [];
  let parsedDate = ''

  const dateFilter = (parsedDate) => {
    return (reminder) => isSameHour(
      parsedDate,
      utcToZonedTime(reminder.datetime, 'America/Panama')
    )
  }

  for (let i = 0; i < 24; i++) {
    parsedDate = parse(i, 'H', props.date);
    fullDay.push(
      <div key={i} className='date-schedule'>
        <div>{format(parsedDate, 'HH:mm')}</div>
        { // Get reminders for a specific hour
          (nameState.reminders) ? nameState.reminders
            .sort(
              (a, b) => compareAsc(
                utcToZonedTime(a.datetime, 'America/Panama'),
                utcToZonedTime(b.datetime, 'America/Panama')
              )
            )
            .filter(dateFilter(parsedDate))
            .map((reminder, index) =>
              <ReminderDetails
                key={index}
                id={reminder._id}
                description={reminder.description}
                color={reminder.color}
                datetime={utcToZonedTime(reminder.datetime, 'America/Panama')}
                city={reminder.city}
              />
            ) : null
        }
      </div>
    );
  }

  return (
    <div className='full-day'>
      <div>
        <div>Time</div>
        <div>City</div>
        <div>Reminder</div>
      </div>
      <div>
        {fullDay}
      </div> 
    </div>
  )
}
