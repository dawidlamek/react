import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function MeetingCalendar() {
  const { meetings } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const meetingsOnDate = meetings.filter(m => m.date === selectedDate.toISOString().slice(0, 10));

  return (
    <>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Spotkania na {selectedDate.toISOString().slice(0, 10)}
      </Typography>
      <List>
        {meetingsOnDate.length > 0 ? meetingsOnDate.map(m => (
          <ListItem key={m.id}>
            <ListItemText primary={`${m.title} (${m.startTime}-${m.endTime})`} secondary={`Utworzony przez: ${m.createdBy}`} />
          </ListItem>
        )) : <Typography>Brak spotkań w tym dniu.</Typography>}
      </List>
    </>
  );
}
