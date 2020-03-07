import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Calendar from './pages/Calendar/Calendar';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle,
  faTimesCircle
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
