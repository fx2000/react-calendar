import React from 'react';
import ReactDOM from 'react-dom';

const Reminder = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div><h1>This is a modal!</h1></div>
  </React.Fragment>, document.body
) : null;

export default Reminder;
