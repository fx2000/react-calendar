import React, { useState, useEffect } from 'react';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import PropTypes from 'prop-types';

// Reminders API
import remindersApi from '../../lib/APIservice';

// Components
import { Schedule } from '../../components/Schedule/Schedule';

// Bootstrap components
import {
  Button
} from 'react-bootstrap';

export const Date = (props) => {
  const { date } = props.match.params;
  const [reminders, setReminders] = useState();

  // Call reminders API
  useEffect(() => {
    remindersApi.listDate(date).then(({ data }) => setReminders(data));
  }, [date]);

  const deleteReminder = (id) => {
    remindersApi.delete(id).then(
      remindersApi.listDate(date).then(({ data }) => setReminders(data))
    );
  };

  const deleteByDate = (date) => {
    remindersApi.deleteDate(date).then(
      remindersApi.listDate(date).then(({ data }) => setReminders(data))
    );
  };

  return (
    <div className="date-schedule">
      <div className="schedule-titlebar">
        {format(zonedTimeToUtc(date, 'America/Panama'), 'EEEE MMMM do, yyyy')}
        <Button variant="danger" onClick={() => { deleteByDate(date); }}>Delete All</Button>
      </div>
      <Schedule
        reminders = { reminders }
        date = { zonedTimeToUtc(date, 'America/Panama') }
        deleteReminder = { deleteReminder }
      />
    </div>
  );
};

Date.propTypes = {
  match: PropTypes.object.isRequired
};
