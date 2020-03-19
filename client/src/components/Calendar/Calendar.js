import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  compareAsc
} from 'date-fns';
import {
  format,
  utcToZonedTime
} from 'date-fns-tz';

// Components
import { Reminder } from '../../components/Reminder/Reminder';

export const Calendar = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props)
  }, [props]);

  // Date hooks
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calendar controls
  const controls = () => {
    return (
      <div className='controls'>
        <div className='control-container'>
          <FontAwesomeIcon icon='chevron-left'
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          />
        </div>
        <div className='control-container'>{format(currentDate, 'MMMMMM yyyy')}</div>
        <div className='control-container'>
          <FontAwesomeIcon icon='chevron-right'
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          />
        </div>
      </div>
    );
  };

  // Generate days of the week (Sun-Sat)
  const weekdays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className='weekdays'>{format(addDays(startDate, i), 'eee')}</div>
      );
    }
    return (
      <div className='weekdays-grid'>{days}</div>
    );
  };

  // Generate individual dates
  const dates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const dateStart = startOfWeek(monthStart);
    const dateEnd = endOfWeek(monthEnd);
    const dates = [];
    
    let dailyReminders = [];
    let days = []
    let day = dateStart;
    let formattedDate = '';

    while (day <= dateEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const copyOfDay = day; // Avoid unsafe reference warning

        // Check if reminders have loaded from props, filter and sort
        if (nameState.reminders) {
          dailyReminders = nameState.reminders
            .sort(
              (a, b) => compareAsc(
                utcToZonedTime(a.datetime, 'America/Panama'),
                utcToZonedTime(b.datetime, 'America/Panama')
              )
            )
            .filter(
              reminder => isSameDay(
                copyOfDay,
                utcToZonedTime(reminder.datetime, 'America/Panama')
              )
            );
        }

        // Mark out of month dates as 'disabled' and currently selected date as 'selected'
        days.push(
          <div className={
              `days${!isSameMonth(day, monthStart) ? ' disabled'
                : isSameDay(day, selectedDate) ? ' selected'
                : isToday(day) ? ' today'
                : ''}`
            }
            key={day}
            onClick={() => setSelectedDate(copyOfDay)}
            onDoubleClick={() => window.location.href = `/date/${format(selectedDate, 'yyyy-MM-dd')}`}
          >
            <span>{formattedDate}</span>
            <div className='daily-reminder-list' onClick={() => setSelectedDate(copyOfDay)}>
              { // Get reminders for a specific date
                nameState.reminders ? dailyReminders
                  .sort(
                    (a, b) => compareAsc(
                      utcToZonedTime(a.datetime, 'America/Panama'),
                      utcToZonedTime(b.datetime, 'America/Panama')
                    )
                  )
                  .map((reminder, index) =>
                    <Reminder
                      key = { index }
                      id = { reminder._id }
                      description = { reminder.description }
                      color = { reminder.color }
                      datetime={ utcToZonedTime(reminder.datetime, 'America/Panama') }
                      city = { reminder.city }
                    />
                ) : null
              }
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      dates.push(
        <div className='days-grid' key={day}>{days}</div>
      );
      days = []; // Clear days array
    }
    return (
      <div className='dates'>{dates}</div>
    );
  };

  return (
    <div className='calendar'>
      {controls()}
      {weekdays()}
      {dates()}
    </div>
  );
};
