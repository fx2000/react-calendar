import React from 'react'

// Components
import { Titlebar } from '../../components/Titlebar/Titlebar';
import { Calendar } from '../../components/Calendar/Calendar';

export const Main = () => {
  return (
    <div>
      <Titlebar />
      <Calendar />
    </div>
  )
}
