import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap components
import {
  Button,
  ButtonGroup
} from 'react-bootstrap';

export const ReminderDetails = (props) => {
  const edit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  return (
    <div style={{ backgroundColor: props.color }} className="reminder-details">
      <div>{props.city}</div>
      <div>{props.description}</div>
      <ButtonGroup>
        <Button variant="light" onClick={() => edit(props.id)}>Edit</Button>
        <Button variant="light" onClick={() => props.deleteReminder(props.id)}>Delete</Button>
      </ButtonGroup>
    </div>
  );
};

ReminderDetails.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteReminder: PropTypes.func.isRequired
};
