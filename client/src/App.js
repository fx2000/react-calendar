import React from 'react';
import { Switch, Route } from "react-router-dom";
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

// Pages
import { Main } from './pages/Main/Main';
import { Date } from './pages/Date/Date';

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
      <Titlebar />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/date/:date' component={Date} />
      </Switch>
    </div>
  );
};

export default App;
