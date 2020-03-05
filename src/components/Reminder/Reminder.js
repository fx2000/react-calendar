import React from 'react';
import ReactDOM from 'react-dom';

const Reminder = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className='modal-overlay' data-backdrop="false">
      <div className='modal-wrapper' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className='modal-main'>
          <div className='modal-header'>
            <h2>Reminder</h2>
          </div>
          <div className='modal-body'>
            <p>Content goes here!</p>
          </div>
          <div className='modal-footer'>
            <button onClick={hide}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Reminder;
