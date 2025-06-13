import React from 'react';
import ReactDOM from 'react-dom/client';
import AppointmentList from './features/appointments/AppointmentList';
import WeeklyAppointmentList from './features/appointments/WeeklyAppointmentList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WeeklyAppointmentList />
    <AppointmentList />
  </React.StrictMode>
);
