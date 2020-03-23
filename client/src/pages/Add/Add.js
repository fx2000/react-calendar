import React, { useState } from 'react';

export const Add = (props) => {

  return (
    <div>
      <form>
        <label for='description'>Reminder: </label>
        <input type='text' id='description' name='description'></input>
        <label for='city'>City: </label>
        <input type='text' id='city' name='city'></input>
        <label for='color'>Color: </label>
        <input type='color' id='color' name='color'></input>
        <label for='datetime'>Date & Time: </label>
        <input type='text' id='datetime' name='datetime'></input>
      </form>
    </div>
  );
};
