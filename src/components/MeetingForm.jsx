import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Stack } from '@mui/material';

export default function MeetingForm({ meeting, onClose, onSaved }) {
  const { addMeeting, editMeeting, currentUser } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [participants, setParticipants] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title);
      setDescription(meeting.description);
      setDate(meeting.date);
      setStartTime(meeting.startTime);
      setEndTime(meeting.endTime);
      setParticipants(meeting.participants.join(', '));
    }
  }, [meeting]);

  const handleSubmit = () => {
    if (!title || !date || !startTime || !endTime) {
      setError('Wypełnij wszystkie wymagane pola');
      return;
    }
    const meetingData = {
      id: meeting?.id,
      title,
      description,
      date,
      startTime,
      endTime,
      participants: participants.split(',').map(p => p.trim()).filter(Boolean),
      createdBy: meeting ? meeting.createdBy : currentUser.username,
      status: meeting ? meeting.status : 'scheduled',
    };
    if (meeting) {
      editMeeting(meetingData);
    } else {
      addMeeting(meetingData);
    }
    onSaved();
  };

  return (
  <Dialog open onClose={onClose}>
    <DialogTitle>{meeting ? 'Edytuj spotkanie' : 'Dodaj spotkanie'}</DialogTitle>
    <DialogContent>
      <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
        <TextField label="Tytuł" value={title} onChange={e => setTitle(e.target.value)} required />
        <TextField label="Opis" value={description} onChange={e => setDescription(e.target.value)} multiline rows={3} />
        <TextField
          label="Data"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <TextField
          label="Godzina rozpoczęcia"
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
        <TextField
          label="Godzina zakończenia"
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          required
        />
        <TextField
          label="Uczestnicy (oddziel przecinkami)"
          value={participants}
          onChange={e => setParticipants(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit}>Zapisz</Button>
      <Button onClick={onClose}>Anuluj</Button>
    </DialogActions>
  </Dialog>
);
}
