import React, { useState, useEffect } from 'react';

export const Schedule = (props) => {
  // Reminder hooks
  const [nameState, setNameState] = useState(props);
  useEffect(() => {
    setNameState(props)
  }, [props]);
  console.log(nameState.reminders)

  return (
    <div>
      Schedule here
    </div>
  )
}
