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

class App extends Component {
  render () {
    return (
      <>
        <Navbar />
        <Calendar />
      </>
    );
  }
}

export default App;
