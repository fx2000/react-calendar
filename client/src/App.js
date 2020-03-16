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

// Pages
import { Main } from './pages/Main/Main';

library.add(
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faPlusCircle,
  faTimesCircle
);

function App () {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
