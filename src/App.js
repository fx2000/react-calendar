import React, { Component } from 'react';
/* import { Switch, Route } from 'react-router-dom'; */
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
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
  return (
    <div className='App'>
      <Navbar />
      <Calendar />
    </div>
  );
};

export default App;
