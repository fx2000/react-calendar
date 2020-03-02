import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Navbar
} from 'react-bootstrap';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Titlebar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <FontAwesomeIcon icon={faCalendarAlt} />
        Calendar
      </Navbar.Brand>
    </Navbar>
  );
};

export default Titlebar;
