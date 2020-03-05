import React, { useState } from 'react';
import {
  format,
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
  parse
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Calendar = () => {
  // Date hooks
  const [
    currentDate,
    setCurrentDate
  ] = useState(new Date());
  const [
    selectedDate,
    setSelectedDate
  ] = useState(new Date());

  // Calendar: header and controls
  const controls = () => {
    return (
      <header className='controls'>
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
      </header>
    );
  };

  // Calendar: Days of the week
  const weekdays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className='weekdays'>
          {format(addDays(startDate, i), 'eee')}
        </div>
      );
    }
    return <div className='weekdays-grid'>{days}</div>;
  };

  // Calendar: Dates
  const dates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const dateStart = startOfWeek(monthStart);
    const dateEnd = endOfWeek(monthEnd);
    const weeks = [];

    let days = [];
    let day = dateStart;
    let formattedDate = '';

    while (day <= dateEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        days.push(
          <div
            className={
              `${!isSameMonth(day, monthStart) ? 'disabled'
                : isSameDay(day, selectedDate) ? 'selected'
                : ''}`
            }
            key={day}
            onClick={() => setSelectedDate(cloneDay) }
          >
            <span className='days'>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      weeks.push(
        <div className='days-grid' key={day}> {days} </div>
      );
      days = [];
    }
    return <div className='weeks'>{weeks}</div>;
  };

  return (
    <section className='calendar'>
      {controls()}
      {weekdays()}
      {dates()}
      <footer className='footer-buttons'>
        <FontAwesomeIcon icon='plus-circle'
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        />
        <a href='/'>Add a reminder...</a>
      </footer>
    </section>
  );
};

export default Calendar;
