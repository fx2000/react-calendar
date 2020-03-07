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
  compareAsc
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modali, { useModali } from 'modali';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  // Date handlers
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    toggleRemindersModal();
    toggleDetailsModal();
    setSelectedReminder(reminders[index]);
    setSelectedDate(reminders[index].date);
  };
  const clearSelectedReminder = () => {
    setSelectedReminder({
      date: currentDate,
      descrition: '',
      city: '',
      color: ''
    });
  };
  const deleteReminder = reminderIndex => {
    setReminders(reminders.filter((reminder, index) => index !== reminderIndex));
  };

  // Datepicker
  const [newReminderDate, setNewReminderDate] = useState(new Date());

  // Reminder Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: selectedReminder.description,
      city: selectedReminder.city,
      color: selectedReminder.color
    }
  });
  const onSubmit = data => {
    addReminder(newReminderDate, data.description, data.city, data.color);
    setSelectedDate(currentDate);
    toggleDetailsModal();
  };

  // Modal toggles
  const [remindersModal, toggleRemindersModal] = useModali({
    animated: true,
    large: true,
    title: selectedDate ? format(selectedDate, 'eee MMMMMM d yyyy')
      : format(currentDate, 'eee MMMMMM d yyyy')
  });
  const [detailsModal, toggleDetailsModal] = useModali({
    animated: true,
    large: true,
    title: 'Reminders',
    onHide: () => clearSelectedReminder()
  });

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
        const dailyReminders = reminders.sort((a, b) => compareAsc(a.date, b.date))
          .filter(reminder => isSameDay(copyOfDay, reminder.date));

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
                setSelectedDate(copyOfDay);
              }
            }
          >
            <span>{formattedDate}</span>
            <div
              className='daily-reminder-list'
              onClick={
                () => {
                  setSelectedDate(copyOfDay);
                  toggleRemindersModal();
                }
              }
            >
              {
                dailyReminders.sort((a, b) => compareAsc(a.date, b.date)).map((reminder, index) =>
                  <div
                    key={index}
                    style={{ backgroundColor: reminder.color }}
                    className='daily-reminder'
                  >
                    {reminder.description}
                  </div>
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

  // OpenWeather API TODO: Move API key to local env file
  const weatherApiCall = async city => {
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e4222812569564ba170882b5d2c1c72f&units=metric`);
    const data = await apiCall.json();
    return data;
  };

  // TODO: Post weather forecast to calendar
  const postWeather = data => {
    console.log(data);
  };

  const getWeather = city => {
    weatherApiCall(city).then(data => postWeather(data));
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
        /><p>Add new reminder...</p>
      </div>
      {/* Reminders List Modal */}
      <Modali.Modal {...remindersModal}>
        <Table responsive className="reminders-table" hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Reminder</th>
              <th>Location</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {
              reminders
                .filter(reminder => isSameDay(reminder.date, selectedDate))
                .sort((a, b) => compareAsc(a.date, b.date))
                .map(
                  (reminder, index) =>
                    <tr
                      key={index}
                      className='daily-reminder'
                      style={{ backgroundColor: reminder.color }}
                      onClick={() => showDetails(index, reminder)}
                    >
                      <td>{format(reminder.date, 'hh:mm a')}</td>
                      <td>{reminder.description}</td>
                      <td>{reminder.city}</td>
                      <td>Weather Info Placeholder
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon='times-circle'
                          onClick={() => deleteReminder(index)}
                        />
                      </td>
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
          <input
            type="text"
            placeholder="Reminder"
            name="description"
            ref={register({ required: true, maxLength: 30 })}
          />
          <label htmlFor='datetime'>Date & Time:</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setNewReminderDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            todayButton="Today"
          />
          <label htmlFor='city'>City:</label>
          <input
            type="text"
            placeholder="City"
            name="city"
            ref={register({ required: true, maxLength: 30 })}
          />
          <label htmlFor='color'>Color:</label>
          <input
            type="color"
            placeholder="Color"
            name="color"
            ref={register({ required: true })}
          />
          <input type="submit" />
        </form>
      </Modali.Modal>
    </section>
  );
};

export default Calendar;
