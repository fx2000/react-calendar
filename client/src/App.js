import React from 'react';
import './App.css';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

// Components
import { Titlebar } from './components/Titlebar/Titlebar';
import { Calendar } from './components/Calendar/Calendar';

library.add(
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle,
  faTimesCircle
);

function App() {
  return (
    <div className="App">
      <Titlebar />
      <Calendar />
    </div>
  );
}

export default App;
