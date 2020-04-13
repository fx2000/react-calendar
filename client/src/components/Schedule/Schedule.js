import React, { useState, useEffect } from 'react';
import {
  compareAsc,
  parse,
  isSameHour
} from 'date-fns';
import {
  format,
  utcToZonedTime
} from 'date-fns-tz';
import PropTypes from 'prop-types';

// Components
import { ReminderDetails } from '../../components/ReminderDetails/ReminderDetails';

export const Schedule = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props);
  }, [props]);

  const fullDay = [];
  let parsedDate = '';

  const dateFilter = (parsedDate) => {
    return (reminder) => isSameHour(
      parsedDate,
      utcToZonedTime(reminder.datetime, 'America/Panama')
    );
  };

  for (let i = 0; i < 24; i++) {
    parsedDate = parse(i, 'H', props.date);
    fullDay.push(
      <div key={i} className='full-day-time'>
        <div>{format(parsedDate, 'HH:mm')}</div>
        <div className="reminder-list">
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
                  deleteReminder={props.deleteReminder}
                />
              ) : null
          }
        </div>
      </div>
    );
  }

  return (
    <div className='full-day'>
      <div className="full-day-titlebar">
        <div>Time</div>
        <div>City</div>
        <div>Reminder</div>
        <div>Actions</div>
      </div>
      <div className="full-day-hours">
        {fullDay}
      </div>
    </div>
  );
};

Schedule.propTypes = {
  date: PropTypes.object.isRequired,
  deleteReminder: PropTypes.func.isRequired
};
