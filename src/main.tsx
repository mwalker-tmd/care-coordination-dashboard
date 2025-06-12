import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppointmentList } from './features/appointments/AppointmentList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppointmentList />
  </React.StrictMode>
);
