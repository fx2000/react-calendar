import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <nav>
      <FontAwesomeIcon icon='calendar-alt' />
      <span className='title'>Jobsity Calendar</span>
    </nav>
  );
};

export default Navbar;
