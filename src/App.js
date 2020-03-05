import React, { Component } from 'react';
/* import { Switch, Route } from 'react-router-dom'; */
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Reminder from './components/Reminder/Reminder';

// Custom hooks
import useModal from './hooks/useModal';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle
);

const App = () => {
  const { isShowing, toggle } = useModal();
  return (
    <div className='App'>
      <Navbar />
      <Calendar />
      <Reminder
        isShowing={isShowing}
        hide={toggle}
      />
      <div className='footer-buttons'>
        <FontAwesomeIcon
          icon='plus-circle'
          onClick={toggle}
        />
      </div>
    </div>
  );
};

export default App;
