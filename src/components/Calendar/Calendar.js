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
  isSameDay
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modali, { useModali } from 'modali';
import { useForm } from 'react-hook-form';
import DailyReminders from '../DailyReminders/DailyReminders';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  // Date handlers
  const [
    currentDate,
    setCurrentDate
  ] = useState(new Date());
  const [selectedDate,
    setSelectedDate
  ] = useState(new Date());

  // Modal toggles
  const [remindersModal, toggleRemindersModal] = useModali({
    animated: true,
    large: true,
    title: selectedDate ? format(selectedDate, 'eee MMMMMM d yyyy')
      : format(currentDate, 'eee MMMMMM d yyyy'),
    onHide: () => console.log('I\'m hidden')
  });
  const [detailsModal, toggleDetailsModal] = useModali({
    animated: true,
    large: true,
    title: 'Reminders',
    onHide: () => console.log('I\'m hidden')
  });

  // Calendar: Reminders
  const [reminders, setReminders] = useState([]);
  const addReminder = (date, description, city, color) => {
    setReminders([
      ...reminders,
      {
        date: date,
        description: description,
        city: city,
        color: color
      }
    ]);
  };
  const [selectedReminder, setSelectedReminder] = useState({});
  const showDetails = (index, reminder) => {
    toggleDetailsModal();
    setSelectedReminder(reminders[index]);
    console.log(selectedReminder);
  };

  // Reminder Form
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    addReminder(newReminderDate, data.description, data.city, data.color);
  };
  console.log(errors);

  // Datepicker
  const [newReminderDate, setNewReminderDate] = useState(new Date());

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
        const copyOfDay = day; // Removes unsafe reference warning
        const dailyReminders = reminders.filter(reminder => isSameDay(copyOfDay, reminder.date));

        days.push(
          <div
            className={
              `days ${!isSameMonth(day, monthStart) ? 'disabled'
                : isSameDay(day, selectedDate) ? 'selected'
                : ''}`
            }
            key={day}
            onClick={
              () => {
                // TODO: Disable clicking out of month days
                setSelectedDate(copyOfDay);
                toggleRemindersModal();
              }
            }
          >
            <span>{formattedDate}</span>
            <div className='daily-reminder-list'>
              {
                dailyReminders.map((reminder, index) =>
                  <DailyReminders
                    key={index}
                    description={reminder.description}
                    color={reminder.color}
                  />
                )
              }
            </div>
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

      <div className='footer-buttons'>
        <FontAwesomeIcon
          icon='plus-circle'
          onClick={() => toggleDetailsModal()}
        />
      </div>
      {/* Reminders List Modal */}
      <Modali.Modal {...remindersModal}>
        <Table responsive className="reminders-table" hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Reminder</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {
              reminders.filter(reminder => isSameDay(reminder.date, selectedDate)).map((reminder, index) =>
                <tr key={index} className='daily-reminder' style={{ backgroundColor: reminder.color }} onClick={() => showDetails(index, reminder)}>
                  <td>{format(reminder.date, 'hh:mm a')}</td>
                  <td>{reminder.description}</td>
                  <td>{reminder.city}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Modali.Modal>

      {/* Reminder Details Modal */}
      <Modali.Modal {...detailsModal}>
        <form onSubmit={handleSubmit(onSubmit)} className='reminder-form'>
          <label htmlFor='description'>Reminder:</label>
          <input type="text" placeholder="Reminder" name="description" ref={register({ required: true, maxLength: 30 })} />
          <label htmlFor='datetime'>Date & Time:</label>
          <DatePicker
            name='datetime'
            selected={newReminderDate}
            onChange={date => setNewReminderDate(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm aa'
          />
          <label htmlFor='city'>City:</label>
          <input type="text" placeholder="City" name="city" ref={register({ required: true, maxLength: 30 })} />
          <label htmlFor='color'>Color:</label>
          <input type="color" placeholder="Color" name="color" ref={register({ required: true })} />

          <input type="submit" />
        </form>
      </Modali.Modal>
    </section>
  );
};

export default Calendar;
